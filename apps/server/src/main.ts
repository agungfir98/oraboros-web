import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExecptionFilter } from './http-execptionFilter';
import { env } from './lib/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [env.originUri],
  });

  app.useGlobalFilters(new HttpExecptionFilter());
  await app.listen(env.port);
}
bootstrap();
