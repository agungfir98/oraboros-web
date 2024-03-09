import { Injectable } from '@nestjs/common';
import { CreateTransactionDTO } from '@ob/dto';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private readonly prismaService: PrismaService) {}

  public async transactionCount() {
    return await this.prismaService.transactions.count();
  }

  public async getUserTransaction(userId: string) {
    return await this.prismaService.transactions.findMany({
      where: { userId },
      include: {
        order: true,
        _count: true,
      },
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
