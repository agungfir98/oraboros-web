import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateBudgetsDTO } from '@ob/dto';
import { BudgetService } from './budget.service';

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}
  @Get()
  async getBudget() {}

  @Post('newbudgets')
  async createBulkBudgets(
    @Query() query: Pick<CreateBudgetsDTO, 'userId'>,
    @Body() data: Omit<CreateBudgetsDTO, 'userId'>[],
  ) {
    const createBudgetsDTO: CreateBudgetsDTO[] = data.map((data) => ({
      ...query,
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
