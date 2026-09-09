import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import { getPool } from '@/lib/db';
import { buildSiteKnowledge } from '@/lib/ai-context';
import { STRATEGIC_CONTEXT } from '@/lib/ai-strategic-context';
import { CONTACT_PHONE_DISPLAY } from '@/lib/contactInfo';
import type { Lang } from '@/lib/translations';

export const dynamic = 'force-dynamic';

const LANGS: Lang[] = ['kk', 'ru', 'en', 'zh', 'tr'];
const LANG_NAMES: Record<Lang, string> = {
  kk: 'қазақ',
  ru: 'русский',
  en: 'English',
  zh: '中文',
  tr: 'Türkçe',
};

const MAX_HISTORY = 12;
const MAX_MESSAGE_LENGTH = 1500;
const RATE_LIMIT_WINDOW_MINUTES = 10;
const RATE_LIMIT_MAX_MESSAGES = 20;

interface IncomingMessage {
  role: 'user' | 'bot';
  text: string;
}

function hashIp(ip: string): string {
  const salt = process.env.COMMENT_IP_SALT || 'kasipker-comments';
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex');
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

function buildSystemPrompt(lang: Lang): string {
  const langName = LANG_NAMES[lang];
  const styleRule =
    lang === 'kk'
      ? '\n\nҮлкен сызықша (—) қазақша жауапта қолданылмайды — оның орнына үтір, нүкте немесе жаңа сөйлем қолдан.'
      : '';

  return `Сен — Kasipker Кәсіпкерлер Альянсының ресми сайтындағы AI-көмекшісің. Тек төменде берілген "САЙТ КОНТЕКСТІ" және "ҚОСЫМША КОНТЕКСТ" ішіндегі ақпаратқа сүйеніп жауап бер, білмейтін нәрсені ойдан шығарма.

Тіл ережесі: сайт қазір ${langName} тілінде тұр. Жауабыңды МІНДЕТТІ түрде осы тілде жаз, пайдаланушы басқа тілде жазса да.

Стиль: қысқа, нақты, кәсіби әрі достық. Markdown жұлдызша (**) және тақырыпша қолданба, жай мәтінмен жаз. Абзацтар қысқа болсын.${styleRule}

Мүшелік бағасы туралы нақты сұрақ қойылса, "ҚОСЫМША КОНТЕКСТ" ішіндегі деңгейлер кестесін бере аласың, бірақ соңында жеке ұсыныс алу үшін "Байланыс" бетіндегі форманы толтыруды немесе ${CONTACT_PHONE_DISPLAY} нөміріне хабарласуды ұсын.

Мемлекеттік органдар немен саяси партиялармен байланыс туралы сұрақ қойылса — нақты партия немесе ұйым атын өз бетінше атама, бейтарап әрі жалпы жауап бер, толығырақ ақпарат үшін "Байланыс" бетіне бағытта.

Егер сұрақ контекстен тыс болса (жеке заңгерлік кепілдік, әлі жарияланбаған ақпарат), мұны құрметпен айт және "Байланыс" бетінен немесе ${CONTACT_PHONE_DISPLAY} нөмірінен хабарласуды ұсын.

=== САЙТ КОНТЕКСТІ ===
${buildSiteKnowledge(lang)}
=== КОНТЕКСТ СОҚЫ ===

=== ҚОСЫМША КОНТЕКСТ (стратегиялық) ===
${STRATEGIC_CONTEXT}
=== ҚОСЫМША КОНТЕКСТ СОҢЫ ===`;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const { messages, lang: rawLang } = (payload ?? {}) as { messages?: IncomingMessage[]; lang?: string };
  const lang: Lang = LANGS.includes(rawLang as Lang) ? (rawLang as Lang) : 'kk';

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'messages_required' }, { status: 400 });
  }

  const history = messages
    .slice(-MAX_HISTORY)
    .filter((m) => m && typeof m.text === 'string' && m.text.trim().length > 0)
    .map((m) => ({
      role: (m.role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
      content: m.text.trim().slice(0, MAX_MESSAGE_LENGTH),
    }));

  if (history.length === 0) {
    return NextResponse.json({ error: 'messages_required' }, { status: 400 });
  }

  try {
    const ipHash = hashIp(getClientIp(req));
    const pool = getPool();

    const recentCount = await pool.query(
      `SELECT count(*) FROM ai_assistant_usage WHERE ip_hash = $1 AND created_at > now() - interval '${RATE_LIMIT_WINDOW_MINUTES} minutes'`,
      [ipHash]
    );
    if (Number(recentCount.rows[0].count) >= RATE_LIMIT_MAX_MESSAGES) {
      return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
    }
    await pool.query('INSERT INTO ai_assistant_usage (ip_hash) VALUES ($1)', [ipHash]);
  } catch (err) {
    // Rate-limit bookkeeping failing shouldn't block a real reply -- log and continue.
    console.error('AI usage rate-limit check failed:', err);
  }

  try {
    const upstream = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'system', content: buildSystemPrompt(lang) }, ...history],
        temperature: 0.4,
        max_tokens: 600,
      }),
    });

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => '');
      console.error('DeepSeek API error:', upstream.status, errText);
      return NextResponse.json({ error: 'upstream_error' }, { status: 502 });
    }

    const data = await upstream.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return NextResponse.json({ error: 'empty_reply' }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error('POST /api/assistant failed:', err);
    return NextResponse.json({ error: 'unreachable' }, { status: 502 });
  }
}
