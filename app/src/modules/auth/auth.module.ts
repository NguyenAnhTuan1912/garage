import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

// Import controllers
import { AuthController } from "./auth.controller";

// Import modules
import { UsersModule } from "../users/users.module";

// Import services
import { PrismaService } from "src/common/services/prisma.service";
import { AuthService } from "./auth.service";
import { RefreshTokenService } from "./refresh-token/refresh-token.service";
import { KeyHasherService, HashService } from "src/common/services/hash.service";
import { ApiKeyService } from "./api-key/api-key.service";

// Import strategies
import { JwtStrategy } from "./strategies/jwt.strategy";
import { ApiKeyStrategy } from "./strategies/api-key.strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET"),
      }),
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    RefreshTokenService,
    JwtStrategy,
    ApiKeyStrategy,
    PrismaService,
    ApiKeyService,
    KeyHasherService,
    HashService
  ],
  exports: [AuthService],
})
export class AuthModule {}
