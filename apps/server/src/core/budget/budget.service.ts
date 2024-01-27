import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class BudgetService {
  constructor(private readonly prismaService: PrismaService) {}

  public getUserBudget(userId: string) {
    return this.prismaService.budget.findMany({ where: { userId } });
  }
}
