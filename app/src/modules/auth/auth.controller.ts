import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Res,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiTags,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { Role } from "@prisma/client";

// Import common
import { MissingValueException } from "src/common/errors/class/bad-request";
import { GetCurrentUser } from "src/common/decorators/current-user.decorator";

// Import dto
import { LoginDto, AuthResponseDto } from "./dto/login.dto";
import {
  UpdateApiKeyDto,
  ApiKeyResponseDto,
  ApiKeysResponseDto,
  FirstTimeCreateApiKeyResponseDto,
} from "./dto/api-key.dto";
import { PerformTokenRefreshDto } from "./dto/refresh-token.dto";

// Import decorators
import { Public } from "src/common/decorators/public.decorator";
import { Roles } from "src/common/decorators/roles.decorator";

// Import entities
import { User } from "../users/entities/user.entity";

// Import guards
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";

// Import services
import { AuthService } from "./auth.service";
import { RefreshTokenService } from "./refresh-token/refresh-token.service";
import { ApiKeyService } from "./api-key/api-key.service";

// Import types
import type { Response } from "express";

@Controller("auth")
@UseGuards(RolesGuard)
@ApiTags("Auth")
@ApiBearerAuth()
export class AuthController {
  constructor(
    private authService: AuthService,
    private refreshTokenService: RefreshTokenService,
    private apiKeyService: ApiKeyService
  ) {}

  @Public()
  @Post("login")
  @ApiOperation({ summary: "Đăng nhập vào hệ thống Garage" })
  @ApiOkResponse({ type: AuthResponseDto })
  async login(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const result = await this.authService.login({ params: data });

    response.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 5 * 60 * 60 * 1000,
      path: "/",
    });

    response.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return {
      data: result,
    };
  }

  @Public()
  @Post("access-token/new")
  @ApiOperation({ summary: "Làm mới lại access token" })
  @ApiOkResponse({ type: AuthResponseDto })
  async refreshAccessToken(
    @Body() data: PerformTokenRefreshDto,
    @Res({ passthrough: true }) response: Response
  ) {
    if (!data.refreshToken) throw new MissingValueException("refresh_token");

    const result = await this.refreshTokenService.refreshAccessToken({
      params: { refreshToken: data.refreshToken },
    });

    response.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 5 * 60 * 60 * 1000,
      path: "/",
    });

    response.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return {
      data: result,
    };
  }

  @Get("api-keys")
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: "Trả về api key của người dùng" })
  @ApiOkResponse({ type: ApiKeysResponseDto })
  async getApiKeys(@GetCurrentUser() user: User) {
    const apiKeys = await this.apiKeyService.findMany({
      params: {
        userId: user.id,
      },
    });

    return {
      data: apiKeys,
    };
  }

  @Post("api-keys")
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: "Tạo api key mới cho người dùng" })
  @ApiOkResponse({ type: FirstTimeCreateApiKeyResponseDto })
  async createApiKey(@GetCurrentUser() user: User) {
    const apiKey = await this.apiKeyService.insert({
      params: null,
      options: {
        executorId: user.id,
      },
    });

    return {
      data: apiKey,
    };
  }

  @Patch("api-keys/:id")
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: "Cập nhật api key của người dùng" })
  @ApiOkResponse({ type: ApiKeyResponseDto })
  async updateApiKey(
    @Param("id") id: string,
    @Body() data: UpdateApiKeyDto,
    @GetCurrentUser() user: User
  ) {
    const apiKey = await this.apiKeyService.update({
      params: {
        id,
        data,
      },
      options: {
        executorId: user.id,
      },
    });

    return {
      data: apiKey,
    };
  }

  @Delete("api-keys/:id")
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: "Xoá api key của người dùng" })
  @ApiOkResponse({ type: Boolean })
  async deleteApiKey(@Param("id") id: string, @GetCurrentUser() user: User) {
    await this.apiKeyService.delete({
      params: {
        id,
      },
      options: {
        executorId: user.id,
      },
    });

    return {
      data: true,
    };
  }

  @Post("api-keys/connection")
  @ApiOperation({ summary: "Thử kết nối tới server bằng Api Key" })
  @ApiOkResponse({ type: Boolean })
  async testApiKeyConnection(@GetCurrentUser() user: User) {
    return {
      data: true,
    };
  }
}
