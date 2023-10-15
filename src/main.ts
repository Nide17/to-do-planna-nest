import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  // CREATE OR BOOTSTRAP A NEW INSTANCE OF THE APP
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 5000;

  // ENABLE CORS - ALLOW CROSS ORIGIN RESOURCE SHARING
  app.enableCors();

  // START THE SERVER
  await app.listen(port);
}

// CALL THE BOOTSTRAP FUNCTION TO START THE SERVER
bootstrap();