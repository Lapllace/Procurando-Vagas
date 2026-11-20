import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createDatabaseClient } from '@vagamatch/database';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  readonly prisma = createDatabaseClient();

  async onModuleInit(): Promise<void> {
    await this.prisma.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.prisma.$disconnect();
  }

  async check(): Promise<void> {
    await this.prisma.$queryRaw`SELECT 1`;
  }
}