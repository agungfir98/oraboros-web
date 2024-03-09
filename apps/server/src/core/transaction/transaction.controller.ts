import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { SupabaseGuard } from '../auth/supabase/supabase.guard';
import { CreateTransactionDTO } from '@ob/dto';
import { ProfileService } from '../profile/profile.service';
import { User } from '../auth/user.decorator';
import type { AuthUser } from '@supabase/supabase-js';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly trasactionService: TransactionService,
    private readonly profileService: ProfileService,
  ) {}

  @Get()
  public async getUserTransaction(@Query() query: { userId: string }) {
    const userTransactions = await this.trasactionService.getUserTransaction(
      query.userId,
    );
    const count = await this.trasactionService.transactionCount();

    return {
      status: 'success',
      userTransactions,
      count,
    };
  }

  @Post('/new-transaction')
  @UseGuards(SupabaseGuard)
  public async createTransaction(
    @Body() data: CreateTransactionDTO,
    @User() user: AuthUser,
  ) {
    const profile = await this.profileService.getUserByEmail(user.email);
    const newTransaction = await this.trasactionService.createTransaction(
      data,
      profile.userId,
    );

    return newTransaction;
  }
}
