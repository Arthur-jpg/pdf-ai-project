// import type {Config} from 'drizzle-kit'

// export default {
//     driver: 'pg',
//     schema: './src/lib/db/schema.ts'
// } satisfies Config

import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/lib/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
