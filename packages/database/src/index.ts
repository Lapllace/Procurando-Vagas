import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client.js';

export { Prisma } from './generated/prisma/client.js';

export function createDatabaseClient(
  connectionString = process.env.DATABASE_URL,
): PrismaClient {
  if (!connectionString) {
    throw new Error('DATABASE_URL não foi definida.');
  }

  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export type { PrismaClient };
