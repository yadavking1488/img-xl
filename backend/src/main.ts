import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configuredFrontendUrl = process.env.FRONTEND_URL?.trim();
  const frontendOrigin = configuredFrontendUrl
    ? /^https?:\/\//i.test(configuredFrontendUrl)
      ? configuredFrontendUrl
      : `https://${configuredFrontendUrl}`
    : 'http://localhost:5173';

  app.enableCors({
    origin: frontendOrigin,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}

await bootstrap();
