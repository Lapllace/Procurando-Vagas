import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations' },
  datasource: {
    url:
      process.env.DATABASE_URL ??
      'postgresql://vagamatch:vagamatch_dev_only@127.0.0.1:55432/vagamatch?schema=public',
  },
});