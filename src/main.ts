import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  // CREATE A NEW INSTANCE OF THE APP
  const app = await NestFactory.create(AppModule);

  // ENABLE CORS - ALLOW CROSS ORIGIN RESOURCE SHARING
  app.enableCors();

  // START THE SERVER
  await app.listen(3000);
}
bootstrap();
