import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './app/lib/schemas/userSchema.js',
  dialect: 'postgresql',
  // Only manage application objects, not Supabase's extension schemas.
  schemaFilter: ['public'],
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
