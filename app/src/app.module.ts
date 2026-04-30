import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

// Import controllers
import { AppController } from "./app.controller";

// Import modules
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";

// Import services
import { AppService } from "./app.service";

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
