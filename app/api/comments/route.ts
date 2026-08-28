import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import { getPool } from '@/lib/db';

export const dynamic = 'force-dynamic';

const MAX_NAME_LENGTH = 80;
const MIN_BODY_LENGTH = 2;
const MAX_BODY_LENGTH = 2000;
const RATE_LIMIT_WINDOW_MINUTES = 10;
const RATE_LIMIT_MAX_COMMENTS = 5;

function hashIp(ip: string): string {
  const salt = process.env.COMMENT_IP_SALT || 'kasipker-comments';
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex');
}

function getClientIp(req: NextRequest): string {
  // Vercel sets x-forwarded-for on every request; first entry is the client.
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug');
  if (!slug) {
    return NextResponse.json({ error: 'slug is required' }, { status: 400 });
  }

  try {
    const pool = getPool();
    const result = await pool.query(
      'SELECT id, author_name, body, created_at FROM comments WHERE article_slug = $1 ORDER BY created_at ASC',
      [slug]
    );

    const comments = result.rows.map((row) => ({
      id: row.id,
      authorName: row.author_name,
      body: row.body,
      createdAt: row.created_at,
    }));

    return NextResponse.json({ comments });
  } catch (err) {
    console.error('GET /api/comments failed:', err);
    return NextResponse.json({ error: 'database error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid JSON' }, { status: 400 });
  }

  const { slug, authorName, body, honeypot } = (payload ?? {}) as Record<string, unknown>;

  // Bot trap: real visitors never fill this hidden field (same pattern as
  // the /contact form). Report success without writing anything, so bots
  // get no signal that they were caught.
  if (typeof honeypot === 'string' && honeypot.length > 0) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  if (typeof slug !== 'string' || !slug) {
    return NextResponse.json({ error: 'slug is required' }, { status: 400 });
  }
  if (typeof authorName !== 'string' || authorName.trim().length === 0) {
    return NextResponse.json({ error: 'name is required' }, { status: 400 });
  }
  if (authorName.trim().length > MAX_NAME_LENGTH) {
    return NextResponse.json({ error: 'name too long' }, { status: 400 });
  }
  if (typeof body !== 'string' || body.trim().length < MIN_BODY_LENGTH) {
    return NextResponse.json({ error: 'comment is too short' }, { status: 400 });
  }
  if (body.trim().length > MAX_BODY_LENGTH) {
    return NextResponse.json({ error: 'comment is too long' }, { status: 400 });
  }

  try {
    const ipHash = hashIp(getClientIp(req));
    const pool = getPool();

    const recentCount = await pool.query(
      `SELECT count(*) FROM comments WHERE ip_hash = $1 AND created_at > now() - interval '${RATE_LIMIT_WINDOW_MINUTES} minutes'`,
      [ipHash]
    );
    if (Number(recentCount.rows[0].count) >= RATE_LIMIT_MAX_COMMENTS) {
      return NextResponse.json({ error: 'rate limited' }, { status: 429 });
    }

    const result = await pool.query(
      `INSERT INTO comments (article_slug, author_name, body, ip_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING id, author_name, body, created_at`,
      [slug, authorName.trim(), body.trim(), ipHash]
    );

    const row = result.rows[0];
    return NextResponse.json(
      { comment: { id: row.id, authorName: row.author_name, body: row.body, createdAt: row.created_at } },
      { status: 201 }
    );
  } catch (err) {
    console.error('POST /api/comments failed:', err);
    return NextResponse.json({ error: 'database error' }, { status: 500 });
  }
}
