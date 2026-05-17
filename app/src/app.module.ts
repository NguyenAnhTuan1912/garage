import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";

// Import controllers
import { AppController } from "./app.controller";

// Import guards
import { CombinedAuthGuard } from "./modules/auth/guards/combined-auth.guard";

// Import modules
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";

// Import services
import { AppService } from "./app.service";
import { CollectionsModule } from './modules/collections/collections.module';

@Module({
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: CombinedAuthGuard }],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    CollectionsModule,
  ],
})
export class AppModule {}
