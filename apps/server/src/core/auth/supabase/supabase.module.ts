import { Module } from '@nestjs/common';
import { SupabaseStrategy } from './supabase.strategy';
import { SupabaseService } from 'src/lib/supabase.service';

@Module({
  providers: [SupabaseStrategy, SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
