import { Pool } from 'pg';

// Module-scoped singleton: Vercel reuses warm serverless instances, so this
// pool (and its connections) persists across invocations on the same
// instance instead of opening a fresh connection per request. `max: 5`
// keeps a single instance from exhausting Railway Postgres's connection
// limit if several warm instances are running concurrently.
declare global {
  // eslint-disable-next-line no-var
  var _commentsPool: Pool | undefined;
}

export function getPool(): Pool {
  if (!global._commentsPool) {
    global._commentsPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 5,
    });
  }
  return global._commentsPool;
}
