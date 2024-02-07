import { Module } from '@nestjs/common';
import { SupabaseStrategy } from './supabase.strategy';
import { SupabaseService } from 'src/lib/supabase.service';
import { ProfileService } from 'src/core/profile/profile.service';
import { PrismaService } from 'src/lib/prisma.service';

@Module({
  providers: [SupabaseStrategy, SupabaseService, ProfileService, PrismaService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
