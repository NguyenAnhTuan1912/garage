import { Controller, Post, Body, UseGuards, Res } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { Role } from "@prisma/client";

// Import dto
import { LoginDto } from "./dto/login.dto";

// Import decorators
import { Roles } from "src/common/decorators/roles.decorator";
import { GetCurrentUser } from "src/common/decorators/current-user.decorator";
import { Public } from "src/common/decorators/public.decorator";

// Import entities
import { User } from "../users/entities/user.entity";

// Import guards
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";

// Import services
import { AuthService } from "./auth.service";
import { RefreshTokenService } from "./refresh-token.service";

// Import types
import type { Response } from "express";

@Controller("auth")
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuthController {
  constructor(
    private authService: AuthService,
    private refreshTokenService: RefreshTokenService
  ) {}

  @Public()
  @Post("login")
  @ApiOperation({ summary: "Đăng nhập vào hệ thống Garage" })
  async login(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const result = await this.authService.login({ params: data });

    // Set Refresh Token vào Cookie
    response.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // Bảo mật cơ bản cho cookie
      maxAge: 5 * 60 * 60 * 1000,
      path: "/",
    });

    // Trả về Access Token và User như cũ qua body
    return {
      accessToken: result.accessToken,
      user: result.user,
    };
  }

  @Post("access-token/new")
  @ApiOperation({ summary: "Làm mới lại access token" })
  @Roles(Role.ADMIN, Role.ADMIN)
  async refreshAccessToken(@GetCurrentUser() user: User) {
    return this.refreshTokenService.refreshAccessToken({
      params: { userId: user.id },
    });
  }
}
