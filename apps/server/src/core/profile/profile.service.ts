import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';
import { CreateProfileDTO } from '@ob/dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createUser(data: Omit<CreateProfileDTO, 'userId'>) {
    return this.prismaService.profile.create({
      data,
      include: { _count: true },
    });
  }

  async getUserById(userId: string) {
    return await this.prismaService.profile.findUnique({
      where: { userId },
      select: { _count: true, displayName: true, email: true },
    });
  }

  async getUserByEmail(email: string) {
    try {
      return await this.prismaService.profile.findUnique({
        where: { email },
        select: {
          _count: true,
          displayName: true,
          email: true,
          userId: true,
        },
      });
    } catch (error) {
      throw new Error('failed to find user by email');
    }
  }

  async deleteProfile(userId: string) {
    return await this.prismaService.profile.delete({ where: { userId } });
  }
}
