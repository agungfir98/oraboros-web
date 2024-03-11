import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@ob/db';

export class PrismaService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
  }
}
