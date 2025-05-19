import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1") ///fijo en la url

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true,
      transform:true, ///Ahorra parseos por ej si me mandan un id string y yo espero tipo number lo transforma automaticamente
    })
  )
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
