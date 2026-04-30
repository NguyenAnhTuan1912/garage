import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtService, JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

// Import controllers
import { AuthController } from "./auth.controller";

// Import modules
import { UsersModule } from "../users/users.module";

// Import services
import { AuthService } from "./auth.service";

// Import strategies
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: "15m",
        },
      }),
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
