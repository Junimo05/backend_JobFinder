import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  await app.listen(8000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  console.log("Server listen in 8000.....")
}
bootstrap();
