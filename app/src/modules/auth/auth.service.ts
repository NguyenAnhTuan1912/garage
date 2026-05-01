import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

// Import common
import {
  TServiceActionSchema,
  TGenerateService,
} from "src/common/interfaces/service.interface.js";

// Import dto
import { LoginDto } from "./dto/login.dto.js";

// Import entities
import { User } from "../users/entities/user.entity.js";

// Import services
import { UsersService } from "../users/users.service.js";
import { RefreshTokenService } from "./refresh-token.service.js";

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
    private jwtService: JwtService
  ) {}

  async login(input: Parameters<IAuthServiceAction["login"]>[0]) {
    const { params } = input;
    const user = new User(await this.usersService.find({ params }));
    const isMatch = await bcrypt.compare(params.password, user.hashedPassword);

    if (!isMatch) throw new UnauthorizedException("INVALID_PASSWORD");

    const payload = { sub: user.id, email: user.email, role: user.role };
    const [refreshToken, accessToken] = await Promise.all([
      await this.jwtService.signAsync(payload, {
        expiresIn: "7d",
      }),
      await this.jwtService.signAsync(payload, {
        expiresIn: "5h",
      })
    ]);

    await this.refreshTokenService.insert({ params: { userId: user.id, value: refreshToken } });

    return {
      accessToken,
      user: user,
    };
  }
}
