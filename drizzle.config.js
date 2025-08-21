import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/drizzle/schema.ts',
  out: './src/db/drizzle/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: './db.sqlite3',
  },
});
