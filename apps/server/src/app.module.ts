import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './core/profile/profile.module';
import { PassportModule } from '@nestjs/passport';
import { SupabaseModule } from './core/auth/supabase/supabase.module';

@Module({
  imports: [ProfileModule, PassportModule, SupabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
