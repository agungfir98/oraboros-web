import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { PrismaService } from 'src/lib/prisma.service';
import { ProfileService } from './profile.service';
import { SupabaseService } from 'src/lib/supabase.service';

@Module({
  controllers: [ProfileController],
  providers: [PrismaService, ProfileService, SupabaseService],
})
export class ProfileModule {}
