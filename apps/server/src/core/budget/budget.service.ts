import { Injectable } from '@nestjs/common';
import { CreateBudgetsDTO } from '@ob/dto';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class BudgetService {
  constructor(private readonly prismaService: PrismaService) {}

  public getUserBudget(userId: string) {
    return this.prismaService.budget.findMany({ where: { userId } });
  }

  public createBudgets(createBudgetsDTO: CreateBudgetsDTO[]) {
    return this.prismaService.budget.createMany({
      data: [...createBudgetsDTO],
      skipDuplicates: true,
    });
  }
}
