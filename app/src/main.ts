import "module-alias/register";
import "dotenv/config";

import { NestFactory, Reflector } from "@nestjs/core";
import {
  ValidationPipe,
  ClassSerializerInterceptor,
  ConsoleLogger,
} from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import cookieParser from "cookie-parser";

// Import common
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";

// Import modules
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      logLevels: ["error", "fatal", "warn"],
      colors: true,
      prefix: "GarageApi",
    }),
  });

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.setGlobalPrefix("api");

  const config = new DocumentBuilder()
    .setTitle("Garage Management API")
    .setDescription("The API description for Garage project")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
