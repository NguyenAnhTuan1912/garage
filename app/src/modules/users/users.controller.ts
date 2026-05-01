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

// Import decorators
import { Roles } from "src/common/decorators/roles.decorator";
import { GetCurrentUser } from "src/common/decorators/current-user.decorator";

// Import entities
import { User } from "./entities/user.entity";

// Import guards
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";

// Import services
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FindManyUserDto } from "./dto/find-user.dto";

@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard) // Bảo vệ toàn bộ controller
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(
    @Body() createUserDto: CreateUserDto,
    @GetCurrentUser() executor: User
  ) {
    return this.usersService.insert({
      params: createUserDto,
      options: { executorId: executor.id },
    });
  }

  @Get()
  findAll(@Query() query: FindManyUserDto) {
    return this.usersService.findMany({ params: query });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.find({ params: { id } });
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetCurrentUser() executor: User
  ) {
    return this.usersService.update({
      params: { id, data: updateUserDto },
      options: { executorId: executor.id },
    });
  }

  @Delete(":id")
  @Roles(Role.ADMIN)
  remove(@Param("id") id: string, @GetCurrentUser() executor: User) {
    return this.usersService.remove({
      params: { id },
      options: { executorId: executor.id },
    });
  }
}
