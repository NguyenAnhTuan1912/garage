import "module-alias/register";
import "dotenv/config";

import { NestFactory, Reflector } from "@nestjs/core";
import { ValidationPipe, ClassSerializerInterceptor } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Setup Validation (Dùng cho DTO)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ các field lạ không có trong DTO
      transform: true, // Tự động convert data sang kiểu đúng trong DTO
    })
  );

  // 2. Setup Serialization (Để @Exclude() trong Entity hoạt động)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // 3. Setup Swagger (Tạo tài liệu API)
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
