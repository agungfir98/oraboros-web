import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CreateBudgetsDTO } from '@ob/dto';
import { BudgetService } from './budget.service';
import { SupabaseGuard } from '../auth/supabase/supabase.guard';
import { User } from '../auth/user.decorator';
import type { AuthUser } from '@supabase/supabase-js';
import { ProfileService } from '../profile/profile.service';

export type QueryParam = {
  sum?: boolean;
};

@Controller('budget')
export class BudgetController {
  constructor(
    private readonly budgetService: BudgetService,
    private readonly profileService: ProfileService,
  ) {}

  @UseGuards(SupabaseGuard)
  @Post('newbudgets')
  async createBulkBudgets(
    @Body() data: Omit<CreateBudgetsDTO, 'userId'>[],
    @User() user: AuthUser,
  ) {
    const { userId } = await this.profileService.getUserByEmail(user.email);

    const createBudgetsDTO: CreateBudgetsDTO[] = data.map((data) => ({
      userId: userId,
      ...data,
    }));

    try {
      const newBudgets =
        await this.budgetService.createBudgets(createBudgetsDTO);

      return {
        message: 'success',
        newBudgets,
      };
    } catch (error) {
      return { error };
    }
  }

  @UseGuards(SupabaseGuard)
  @Get('user-budget')
  async getUserBudget(
    @User() user: AuthUser,
    @Query() query: { sum?: boolean },
  ) {
    const profile = await this.profileService.getUserByEmail(user.email);

    try {
      const userBudget = await this.budgetService.getUserBudget(profile.userId);

      const budgetReg = userBudget.reduce(
        (acc, curr) => acc + Number(curr.amount),
        0,
      );

      return {
        userBudget,
        ...(query.sum && {
          sum: userBudget.reduce((acc, curr) => acc + Number(curr.amount), 0),
        }),
      };
    } catch (error) {}
  }
}
