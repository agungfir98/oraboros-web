import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateBudgetsDTO } from '@ob/dto';
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
      console.log(error);
      return { error };
    }
  }
}
