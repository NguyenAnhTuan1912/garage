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
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

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

@ApiTags("User")
@ApiBearerAuth()
@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard) // Bảo vệ toàn bộ controller
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  @Roles(Role.ADMIN, Role.USER)
  async me(@GetCurrentUser() user: User) {
    return this.usersService.find({ params: { id: user.id } });
  }

  @Patch("me")
  @Roles(Role.ADMIN, Role.USER)
  async updateMe(
    @Body() updateUserDto: UpdateUserDto,
    @GetCurrentUser() executor: User
  ) {
    const user = await this.usersService.update({
      params: { id: executor.id, data: updateUserDto },
      options: { executorId: executor.id },
    });

    return {
      data: user,
    };
  }

  @Post()
  @Roles(Role.ADMIN)
  async create(
    @Body() createUserDto: CreateUserDto,
    @GetCurrentUser() executor: User
  ) {
    const user = await this.usersService.insert({
      params: createUserDto,
      options: { executorId: executor.id },
    });

    return {
      data: user,
    };
  }

  @Get()
  @Roles(Role.ADMIN)
  async findMany(@Query() query: FindManyUserDto) {
    const data = await this.usersService.findMany({ params: query });

    return {
      data: data.users,
      meta: data.meta
    };
  }

  @Get(":id")
  @Roles(Role.ADMIN)
  async findOne(@Param("id") id: string) {
    const user = await this.usersService.find({ params: { id } });

    return {
      data: user,
    };
  }

  @Patch(":id")
  @Roles(Role.ADMIN)
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetCurrentUser() executor: User
  ) {
    const user = await this.usersService.update({
      params: { id, data: updateUserDto },
      options: { executorId: executor.id },
    });

    return {
      data: user,
    };
  }

  @Delete(":id")
  @Roles(Role.ADMIN)
  async remove(@Param("id") id: string, @GetCurrentUser() executor: User) {
    const user = await this.usersService.remove({
      params: { id },
      options: { executorId: executor.id },
    });

    return {
      data: user,
    };
  }
}
