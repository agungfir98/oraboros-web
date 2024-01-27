import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createUser() {
    return this.prismaService.profile.create({
      data: { displayName: 'Agoeng' },
    });
  }

  async getUser(userId: string) {
    this.prismaService.profile.findUnique({ where: { userId } });
  }
}
