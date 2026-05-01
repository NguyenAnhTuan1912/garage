import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

// Import common
import {
  TServiceActionSchema,
  TGenerateService,
} from "src/common/interfaces/service.interface.js";

// Import dto
// import { LoginDto } from "./dto/login.dto.js";
import { CreateRefreshTokenDto } from "./dto/create-refresh-token.dto.js";

// Import entities
import { User } from "../users/entities/user.entity.js";

// Import services
import { PrismaService } from "src/common/services/prisma.service.js";
import { UsersService } from "../users/users.service.js";
import { RefreshToken } from "./entities/refresh-token.entity.js";

interface IRefreshTokenServiceAction
  extends
    TGenerateService<
      TServiceActionSchema<
        "refreshAccessToken",
        { params: { userId: string } },
        { accessToken: string; user: User } | undefined
      >
    >,
    TGenerateService<
      TServiceActionSchema<
        "insert",
        { params: CreateRefreshTokenDto },
        RefreshToken
      >
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
      data: { userId: params.userId, value: params.value },
    });

    return new RefreshToken(newRefreshToken); 
  }

  async refreshAccessToken(
    input: Parameters<IRefreshTokenServiceAction["refreshAccessToken"]>[0]
  ) {
    const { params } = input;
    const user = new User(
      await this.usersService.find({ params: { id: params.userId } })
    );
    const refreshToken = new RefreshToken(
      await this.prismaService.refreshToken.findFirstOrThrow({
        where: { userId: params.userId },
      })
    );

    try {
      await this.jwtService.verifyAsync(refreshToken.value);
    } catch (e: any) {
      // Remove refresh token from database.
      await this.prismaService.refreshToken.delete({
        where: { id: refreshToken.id, userId: params.userId },
      });
      return undefined;
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: "5h",
      }),
      user: user,
    };
  }
}
