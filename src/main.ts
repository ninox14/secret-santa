import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Nest secret santa api')
    .setDescription('Test project for Yalantis')
    .setContact('NiNoX', 'http://t.me/NiNoX14', 'hardstuckd5lul@gmail.com')
    .setVersion('0.0.14')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/', app, document);
  await app.listen(PORT);
}
bootstrap();
