import { config } from 'dotenv';
config({ path: '.env.local', quiet: true });
import pg from 'pg';

const { Client } = pg;

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  await client.connect();

  await client.query(`
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      article_slug TEXT NOT NULL,
      author_name TEXT NOT NULL,
      body TEXT NOT NULL,
      ip_hash TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
  await client.query(`CREATE INDEX IF NOT EXISTS comments_article_slug_idx ON comments (article_slug);`);
  await client.query(`CREATE INDEX IF NOT EXISTS comments_ip_hash_created_at_idx ON comments (ip_hash, created_at);`);

  console.log('comments table ready.');
  await client.end();
}

main().catch((err) => {
  console.error('FAILED:', err);
  process.exitCode = 1;
});
