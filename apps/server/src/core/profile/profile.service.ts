import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';
import { CreateProfileDTO } from '@ob/dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createUser(data: Omit<CreateProfileDTO, 'userId'>) {
    return this.prismaService.profile.create({ data });
  }

  async getUserById(userId: string) {
    return await this.prismaService.profile.findUnique({
      where: { userId },
      select: { _count: true, displayName: true, email: true },
    });
  }

  async getUserByEmail(email: string) {
    return await this.prismaService.profile.findUnique({
      where: { email },
      select: { _count: true, displayName: true, email: true },
    });
  }
}
