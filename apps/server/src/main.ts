import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExecptionFilter } from './http-execptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000'],
  });

  app.useGlobalFilters(new HttpExecptionFilter());
  await app.listen(8080);
}
bootstrap();
