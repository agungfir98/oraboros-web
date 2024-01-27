import { Controller, Get } from '@nestjs/common';

@Controller('budget')
export class BudgetController {
  @Get()
  async getBudget() {}
}
