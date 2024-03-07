import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './core/profile/profile.module';
import { PassportModule } from '@nestjs/passport';
import { SupabaseModule } from './core/auth/supabase/supabase.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExecptionFilter } from './http-execptionFilter';
import { BudgetModule } from './core/budget/budget.module';
import { TransactionModule } from './core/transaction/transaction.module';

@Module({
  imports: [
    BudgetModule,
    ProfileModule,
    PassportModule,
    SupabaseModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExecptionFilter,
    },
  ],
})
export class AppModule {}
