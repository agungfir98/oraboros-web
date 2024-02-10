import { Module } from '@nestjs/common';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';
import { PrismaService } from 'src/lib/prisma.service';
import { SupabaseService } from 'src/lib/supabase.service';
import { ProfileService } from '../profile/profile.service';

@Module({
  controllers: [BudgetController],
  providers: [BudgetService, PrismaService, SupabaseService, ProfileService],
})
export class BudgetModule {}
