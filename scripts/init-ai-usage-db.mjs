import { config } from 'dotenv';
config({ path: '.env.local', quiet: true });
import pg from 'pg';

const { Client } = pg;

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  await client.connect();

  await client.query(`
    CREATE TABLE IF NOT EXISTS ai_assistant_usage (
      id SERIAL PRIMARY KEY,
      ip_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
  await client.query(`CREATE INDEX IF NOT EXISTS ai_assistant_usage_ip_hash_created_at_idx ON ai_assistant_usage (ip_hash, created_at);`);

  console.log('ai_assistant_usage table ready.');
  await client.end();
}

main().catch((err) => {
  console.error('FAILED:', err);
  process.exitCode = 1;
});
