import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

// Import dto
import { LoginDto } from "./dto/login.dto.js";

// Import services
import { UsersService } from "../users/users.service.js";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(params: LoginDto) {
    const user = await this.usersService.find(params);
    const isMatch = await bcrypt.compare(params.password, user.hashedPassword);

    if (!isMatch) throw new UnauthorizedException("INVALID_PASSWORD");

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: user,
    };
  }
}
