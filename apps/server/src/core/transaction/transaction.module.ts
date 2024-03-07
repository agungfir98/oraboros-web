import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaService } from 'src/lib/prisma.service';
import { ProfileService } from '../profile/profile.service';

@Module({
  controllers: [TransactionController],
  providers: [PrismaService, TransactionService, ProfileService],
})
export class TransactionModule {}
