import { nanoid } from "nanoid";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

// Import common
import {
  TServiceActionSchema,
  TGenerateService,
} from "src/common/interfaces/service.interface.js";
import { ERefreshTokenErrMessage } from "src/common/errors/message-code/index.js";

// Import dto
// import { LoginDto } from "./dto/login.dto.js";
import {
  CreateRefreshTokenDto,
  UpdateRefreshTokenDto,
  PerformTokenRefreshDto,
} from "../dto/refresh-token.dto.js";

// Import entities
import { User } from "src/modules/users/entities/user.entity.js";

// Import services
import { PrismaService } from "src/common/services/prisma.service.js";
import { UsersService } from "src/modules/users/users.service.js";
import { RefreshToken } from "../entities/refresh-token.entity.js";

interface IRefreshTokenServiceAction
  extends
    TGenerateService<
      TServiceActionSchema<
        "refreshAccessToken",
        { params: PerformTokenRefreshDto },
        { accessToken: string; user: User } | undefined
      >
    >,
    TGenerateService<
      TServiceActionSchema<
        "insert",
        { params: CreateRefreshTokenDto },
        RefreshToken
      >
    >,
    TGenerateService<
      TServiceActionSchema<
        "find",
        { params: { tokenKey?: string; userId?: string } },
        RefreshToken
      >
    >,
    TGenerateService<
      TServiceActionSchema<
        "update",
        { params: { id: string; data: UpdateRefreshTokenDto } },
        RefreshToken
      >
    >,
    TGenerateService<
      TServiceActionSchema<"delete", { params: { id: string } }, RefreshToken>
    > {}

@Injectable()
export class RefreshTokenService implements IRefreshTokenServiceAction {
  constructor(
    private prismaService: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async insert(input: Parameters<IRefreshTokenServiceAction["insert"]>[0]) {
    const { params } = input;
    const existing = await this.prismaService.refreshToken.findFirst({
      where: { userId: params.userId },
    });

    if (existing) {
      const newRefreshToken = await this.prismaService.refreshToken.update({
        where: { userId: params.userId },
        data: { value: params.value },
      });

      return new RefreshToken(newRefreshToken);
    }

    const newRefreshToken = await this.prismaService.refreshToken.create({
      data: {
        userId: params.userId,
        value: params.value,
        tokenKey: params.tokenKey,
      },
    });

    return new RefreshToken(newRefreshToken);
  }

  async find(input: Parameters<IRefreshTokenServiceAction["find"]>[0]) {
    const { params } = input;
    const refreshToken = await this.prismaService.refreshToken.findFirstOrThrow(
      {
        where: {
          OR: [{ userId: params.userId }, { tokenKey: params.tokenKey }],
        },
      }
    );

    return new RefreshToken(refreshToken);
  }

  async delete(input: Parameters<IRefreshTokenServiceAction["delete"]>[0]) {
    const { params } = input;
    const refreshToken = await this.prismaService.refreshToken.findFirstOrThrow(
      {
        where: { id: params.id },
      }
    );

    await this.prismaService.refreshToken.delete({
      where: { id: params.id },
    });

    return new RefreshToken(refreshToken);
  }

  async update(input: Parameters<IRefreshTokenServiceAction["update"]>[0]) {
    const { params } = input;
    const refreshToken = await this.prismaService.refreshToken.findFirstOrThrow(
      {
        where: { id: params.id },
      }
    );

    await this.prismaService.refreshToken.update({
      where: { id: params.id },
      data: params.data,
    });

    return new RefreshToken(refreshToken);
  }

  async refreshAccessToken(
    input: Parameters<IRefreshTokenServiceAction["refreshAccessToken"]>[0]
  ) {
    const { params } = input;
    const refreshToken = new RefreshToken(
      await this.prismaService.refreshToken.findFirstOrThrow({
        where: { tokenKey: params.refreshToken },
      })
    );
    const user = new User(
      await this.usersService.find({
        params: { id: refreshToken.userId },
      })
    );

    try {
      await this.jwtService.verifyAsync(refreshToken.value);
    } catch (e: any) {
      // Remove refresh token from database.
      await this.prismaService.refreshToken.delete({
        where: { id: refreshToken.id, userId: refreshToken.userId },
      });
      throw new UnauthorizedException({
        code: ERefreshTokenErrMessage.INVALID
      });
    }

    // Generate new token key
    const tokenKey = nanoid();
    await this.update({
      params: {
        id: refreshToken.id,
        data: {
          tokenKey,
        },
      },
    });

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: "5h",
      }),
      refreshToken: tokenKey,
      user: user,
    };
  }
}
