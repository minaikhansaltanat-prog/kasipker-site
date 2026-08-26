'use client';
import { useEffect, useState } from 'react';
import { MessageCircle, Send, Loader2 } from 'lucide-react';
import { useLang } from '@/lib/LangContext';
import { pickByLang } from '@/lib/translations';

interface Comment {
  id: number;
  authorName: string;
  body: string;
  createdAt: string;
}

const MONTHS: Record<'kk' | 'ru' | 'en' | 'tr', string[]> = {
  kk: ['қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым', 'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'],
  ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  tr: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
};

// Deliberately not Intl.DateTimeFormat -- same reasoning as
// lib/news.ts's formatNewsDate: browser ICU builds can have incomplete
// data for locales like 'kk-KZ' (confirmed here: Chromium rendered
// "2026 М08 26" instead of a real month name, while Node's ICU handled
// it fine -- the two disagree, and the browser is what visitors see).
// Hand-rolling every language keeps the same behavior everywhere.
function formatCommentDate(iso: string, lang: string): string {
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const time = `${hh}:${mm}`;

  if (lang === 'zh') return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${time}`;
  const key = lang === 'ru' ? 'ru' : lang === 'kk' ? 'kk' : lang === 'tr' ? 'tr' : 'en';
  const month = MONTHS[key][d.getMonth()];
  if (key === 'kk') return `${d.getDate()} ${month} ${d.getFullYear()} ж., ${time}`;
  if (key === 'ru') return `${d.getDate()} ${month} ${d.getFullYear()} г., ${time}`;
  if (key === 'tr') return `${d.getDate()} ${month} ${d.getFullYear()}, ${time}`;
  return `${month} ${d.getDate()}, ${d.getFullYear()}, ${time}`;
}

export default function CommentSection({ slug }: { slug: string }) {
  const { lang } = useLang();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/comments?slug=${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setComments(data.comments ?? []);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (honeypot) return; // bot trap

    if (!name.trim() || !body.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, authorName: name.trim(), body: body.trim(), honeypot }),
      });

      if (res.status === 429) {
        setError(
          pickByLang(
            lang,
            'Тым жиі пікір қалдырдыңыз. Біраздан кейін қайталап көріңіз.',
            'Вы оставляете комментарии слишком часто. Попробуйте позже.',
            "You're commenting too often. Please try again later.",
            '您发表评论过于频繁，请稍后再试。',
            'Çok sık yorum yapıyorsunuz. Lütfen daha sonra tekrar deneyin.'
          )
        );
        return;
      }
      if (!res.ok) {
        setError(
          pickByLang(
            lang,
            'Пікір жіберілмеді. Кейінірек қайталап көріңіз.',
            'Не удалось отправить комментарий. Попробуйте позже.',
            'Could not send the comment. Please try again later.',
            '评论发送失败，请稍后再试。',
            'Yorum gönderilemedi. Lütfen daha sonra tekrar deneyin.'
          )
        );
        return;
      }

      const data = await res.json();
      setComments((prev) => [...prev, data.comment]);
      setName('');
      setBody('');
    } catch {
      setError(
        pickByLang(
          lang,
          'Желі қатесі. Байланысыңызды тексеріп, қайталап көріңіз.',
          'Ошибка сети. Проверьте соединение и попробуйте снова.',
          'Network error. Please check your connection and try again.',
          '网络错误，请检查您的网络连接后重试。',
          'Ağ hatası. Bağlantınızı kontrol edip tekrar deneyin.'
        )
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-12 border-t border-kasipker-navy-50 pt-10">
      <h2 className="mb-6 flex items-center gap-2 text-lg font-extrabold text-kasipker-navy-900">
        <MessageCircle className="h-5 w-5 text-kasipker-gold-500" />
        {pickByLang(lang, 'Пікірлер', 'Комментарии', 'Comments', '评论', 'Yorumlar')}
        {!loading && comments.length > 0 && <span className="text-kasipker-navy-400">({comments.length})</span>}
      </h2>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-kasipker-navy-400">
          <Loader2 className="h-4 w-4 animate-spin" />
          {pickByLang(lang, 'Жүктелуде...', 'Загрузка...', 'Loading...', '加载中...', 'Yükleniyor...')}
        </div>
      ) : comments.length === 0 ? (
        <p className="mb-8 text-sm text-kasipker-navy-500">
          {pickByLang(
            lang,
            'Әзірге пікір жоқ. Бірінші болып пікір қалдырыңыз!',
            'Пока нет комментариев. Будьте первым!',
            'No comments yet. Be the first to leave one!',
            '暂无评论，快来抢占第一条吧！',
            'Henüz yorum yok. İlk yorumu siz yazın!'
          )}
        </p>
      ) : (
        <div className="mb-8 space-y-5">
          {comments.map((c) => (
            <div key={c.id} className="rounded-2xl border border-kasipker-navy-50 bg-white p-4 shadow-card">
              <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <span className="font-bold text-kasipker-navy-900">{c.authorName}</span>
                <span className="text-xs text-kasipker-navy-400">{formatCommentDate(c.createdAt, lang)}</span>
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-kasipker-navy-700">{c.body}</p>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card-kasipker">
        <h3 className="mb-4 text-sm font-bold text-kasipker-navy-900">
          {pickByLang(lang, 'Пікір қалдыру', 'Оставить комментарий', 'Leave a comment', '发表评论', 'Yorum yap')}
        </h3>

        {/* Honeypot: hidden from users, catches bots that fill every field */}
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute h-0 w-0 opacity-0 pointer-events-none"
        />

        <div className="mb-3">
          <input
            required
            type="text"
            maxLength={80}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={pickByLang(lang, 'Атыңыз', 'Ваше имя', 'Your name', '您的姓名', 'Adınız')}
            className="w-full rounded-xl border border-kasipker-navy-100 px-4 py-2.5 text-sm outline-none transition-colors focus:border-kasipker-navy-700"
          />
        </div>
        <div className="mb-3">
          <textarea
            required
            rows={3}
            maxLength={2000}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={pickByLang(
              lang,
              'Пікіріңізді осында жазыңыз...',
              'Напишите ваш комментарий здесь...',
              'Write your comment here...',
              '在此写下您的评论...',
              'Yorumunuzu buraya yazın...'
            )}
            className="w-full resize-none rounded-xl border border-kasipker-navy-100 px-4 py-2.5 text-sm outline-none transition-colors focus:border-kasipker-navy-700"
          />
        </div>

        {error && <p className="mb-3 text-xs font-semibold text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="btn-gold inline-flex cursor-pointer items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {pickByLang(lang, 'Жіберу', 'Отправить', 'Send', '发送', 'Gönder')}
        </button>
      </form>
    </div>
  );
}
