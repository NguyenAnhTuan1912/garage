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
import { ApiBearerAuth, ApiTags, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
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
import {
  FindManyUserDto,
  FindManyUserResponseDto,
  FindUserResponseDto,
  RemoveUserResponseDto,
} from "./dto/find-user.dto";

@Controller("users")
@UseGuards(RolesGuard)
@ApiTags("User")
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: "Lấy thông tin của người dùng hiện tại (theo Access Token hoặc Api Key)" })
  @ApiOkResponse({
    type: FindUserResponseDto,
  })
  async me(@GetCurrentUser() user: User) {
    const existingUser = await this.usersService.find({
      params: { id: user.id },
    });

    return {
      data: existingUser,
    };
  }

  @Patch("me")
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: "Cập nhật thông tin của người dùng hiện tại (theo Access Token hoặc Api Key)" })
  @ApiOkResponse({
    type: FindUserResponseDto,
  })
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
  @ApiOperation({ summary: "Tạo một người dùng mới" })
  @ApiOkResponse({
    type: FindUserResponseDto,
  })
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
  @ApiOperation({ summary: "Lấy thông tin danh sách của một người dùng" })
  @ApiOkResponse({
    type: FindManyUserResponseDto,
  })
  async findMany(@Query() query: FindManyUserDto) {
    const data = await this.usersService.findMany({ params: query });

    return {
      data: data.users,
      meta: data.meta,
    };
  }

  @Get(":id")
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Tìm thông tin của một người dùng" })
  @ApiOkResponse({
    type: FindUserResponseDto,
  })
  async findOne(@Param("id") id: string) {
    const user = await this.usersService.find({ params: { id } });

    return {
      data: user,
    };
  }

  @Patch(":id")
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Cập nhật thông tin của một người dùng" })
  @ApiOkResponse({
    type: FindUserResponseDto,
  })
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
  @ApiOperation({ summary: "Xoá thông tin của một người dùng" })
  @ApiOkResponse({
    type: RemoveUserResponseDto,
  })
  async remove(@Param("id") id: string, @GetCurrentUser() executor: User) {
    const result = await this.usersService.remove({
      params: { id },
      options: { executorId: executor.id },
    });

    return {
      data: result,
    };
  }
}
