import { nanoid } from "nanoid";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

// Import common
import {
  TServiceActionSchema,
  TGenerateService,
} from "src/common/interfaces/service.interface.js";

// Import dto
import { LoginDto } from "./dto/login.dto.js";

// Import entities
import { User } from "../users/entities/user.entity.js";
import { RefreshToken } from "./entities/refresh-token.entity.js";

// Import services
import { UsersService } from "../users/users.service.js";
import { RefreshTokenService } from "./refresh-token/refresh-token.service.js";
import { HashService } from "src/common/services/hash.service.js";

interface IAuthServiceAction extends TGenerateService<
  TServiceActionSchema<
    "login",
    { params: LoginDto },
    { accessToken: string; user: User }
  >
> {}

@Injectable()
export class AuthService implements IAuthServiceAction {
  constructor(
    private usersService: UsersService,
    private refreshTokenService: RefreshTokenService,
    private jwtService: JwtService,
    private hashService: HashService
  ) {}

  async login(input: Parameters<IAuthServiceAction["login"]>[0]) {
    const { params } = input;
    const user = new User(await this.usersService.find({ params }));
    const tokenKey = nanoid();
    let existingRefreshToken: RefreshToken | null = null;

    try {
      existingRefreshToken = new RefreshToken(
        await this.refreshTokenService.find({ params: { userId: user.id } })
      );

      // Remove old refresh token
      // this.refreshTokenService.delete({ params: { id: existingRefreshToken.id } });
    } catch (error: any) {
      // Cannot find refresh token -> new login
    }

    const isMatch = this.hashService.compare(
      params.password,
      user.hashedPassword
    );

    if (!isMatch) throw new UnauthorizedException("INVALID_PASSWORD");

    const payload = { sub: user.id, email: user.email, role: user.role };
    const [refreshToken, accessToken] = await Promise.all([
      await this.jwtService.signAsync(payload),
      await this.jwtService.signAsync(payload, {
        expiresIn: "5h",
      }),
    ]);

    if (!existingRefreshToken) {
      await this.refreshTokenService.insert({
        params: { userId: user.id, value: refreshToken, tokenKey },
      });
    } else {
      await this.refreshTokenService.update({
        params: {
          id: existingRefreshToken.id,
          data: { value: refreshToken, tokenKey },
        },
      });
    }

    return {
      accessToken,
      refreshToken: tokenKey,
      user: user,
    };
  }
}
