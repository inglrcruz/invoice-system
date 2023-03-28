import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true }
  }))

  // Add v1 prefix to all controller routes
  app.setGlobalPrefix('v1')

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Invoice System API')
    .setDescription('Documentation for the Invoice System api.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();


  const document = SwaggerModule.createDocument(app, config);

  // Url to access the swagger
  SwaggerModule.setup('v1/docs', app, document);

  app.enableCors();

  await app.listen(process.env.PORT);

}
bootstrap();