import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CreateBudgetsDTO, GetUserBudgetDTO } from '@ob/dto';
import { BudgetService } from './budget.service';
import { SupabaseGuard } from '../auth/supabase/supabase.guard';
import { User } from '../auth/user.decorator';
import type { AuthUser } from '@supabase/supabase-js';
import { ProfileService } from '../profile/profile.service';

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
  async getUserBudget(@Query() query: GetUserBudgetDTO) {
    try {
      const userBudget = await this.budgetService.getUserBudget(query.userId);

      return {
        userBudget,
        ...(query.sum && {
          sum: userBudget.reduce((acc, curr) => acc + Number(curr.amount), 0),
        }),
      };
    } catch (error) {}
  }
}
