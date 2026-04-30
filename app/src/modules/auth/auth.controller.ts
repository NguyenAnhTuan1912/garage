import {
  Controller,
  Post,
  Body,
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

// Import dto
import { LoginDto } from "./dto/login.dto";

// Import services
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: "Đăng nhập vào hệ thống Garage" })
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
