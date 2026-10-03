import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export function createDb({ databaseUrl }: { databaseUrl: string }) {
  const pool = new Pool({
    connectionString: databaseUrl,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
  const db = drizzle({ client: pool });
  return { pool, db };
}

export type Database = ReturnType<typeof createDb>['db'];
