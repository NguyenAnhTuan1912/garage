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
} from "@nestjs/common";
import { Role } from "@prisma/client";

// Import services
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FindManyUserDto } from "./dto/find-user.dto";

// Import decorators
import { Roles } from "src/common/decorators/roles.decorator";
import { GetCurrentUserId } from "src/common/decorators/get-current-user-id.decorator";

// Import guards
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";

@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard) // Bảo vệ toàn bộ controller
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(
    @Body() createUserDto: CreateUserDto,
    @GetCurrentUserId() executorId: string
  ) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query() query: FindManyUserDto,
    @GetCurrentUserId() executorId: string
  ) {
    return this.usersService.findMany(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.find({ id });
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetCurrentUserId() executorId: string
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @Roles(Role.ADMIN)
  remove(@Param("id") id: string, @GetCurrentUserId() executorId: string) {
    return this.usersService.remove(id);
  }
}
