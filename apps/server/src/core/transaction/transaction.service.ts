import { Injectable } from '@nestjs/common';
import { CreateTransactionDTO, GetTransactionDTO } from '@ob/dto';
import { Prisma } from '@ob/db';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private readonly prismaService: PrismaService) {}

  public async transactionCount() {
    return await this.prismaService.transactions.count();
  }

  public async getUserTransaction(getTransactionDTO: GetTransactionDTO) {
    const { userId, startDate, endDate, take } = getTransactionDTO;
    const transactionWhereClause: Prisma.TransactionsWhereInput = {
      userId,
      createdAt: {
        ...(startDate && { gte: startDate }),
        ...(endDate && { lte: endDate }),
      },
    };
    return await this.prismaService.transactions.findMany({
      where: {
        ...transactionWhereClause,
      },
      include: {
        order: true,
        _count: true,
      },
      ...(take && { take: Number(take) }),
      orderBy: { createdAt: 'desc' },
    });
  }

  public async createTransaction(data: CreateTransactionDTO, userId) {
    const { orders } = data;
    return await this.prismaService.transactions.create({
      data: {
        userId,
        order: {
          createMany: {
            data: orders.map((order) => ({ ...order, userId })),
          },
        },
      },
      include: {
        _count: true,
        order: true,
      },
    });
  }
}
