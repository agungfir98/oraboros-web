import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';
import { CreateProfileDTO, EditProfileDTO } from '@ob/dto';
import { Prisma } from '@prisma/client';

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
    return await this.prismaService.profile.findUnique({
      where: { email },
      select: { _count: true, displayName: true, email: true },
    });
  }

  async editProfile(userId: string, editProfileDTO: EditProfileDTO) {
    const data: Prisma.ProfileUpdateInput = {
      ...editProfileDTO,
    };

    return await this.prismaService.profile.update({
      where: {
        userId,
      },
      data,
    });
  }

  async deleteProfile(userId: string) {
    return await this.prismaService.profile.delete({ where: { userId } });
  }
}
