import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('TaxIUbey - Swagger')
    .setDescription('TaxIubey - Rest API - NestJs')
    .setVersion('1.0.0')
     .addBasicAuth(
      {
        type: 'http',
        scheme: 'basic',
      },
      'basicAuth',
    )
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-api', app,document)

  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
