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
import {
  ApiBearerAuth,
  ApiTags,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { Role } from "@prisma/client";

// Import decorators
import { Roles } from "src/common/decorators/roles.decorator";
import { GetCurrentUser } from "src/common/decorators/current-user.decorator";

// IMport DTO
import { CreateItemDto } from "../dto/create-item.dto";
import {
  FindManyItemDto,
  FindItemResponseDto,
  FindManyItemResponseDto,
  ItemQueryParamsDto,
  RemoveItemResponseDto,
} from "../dto/find-item.dto";
import { UpdateItemDto } from "../dto/update-item.dto";

// Import entities
import { Item } from "../entities/item.entity";
import { User } from "src/modules/users/entities/user.entity";

// Import guards
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";

// Import services
import { ItemsService } from "../items/items.service";

// Import types
import { TActionOptions } from "src/common/interfaces/service.interface";

@Controller("items")
@UseGuards(RolesGuard)
@ApiTags("Item")
@ApiBearerAuth()
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: "Tạo một item mới" })
  @ApiOkResponse({
    type: FindItemResponseDto,
  })
  async create(
    @Body() createItemDto: CreateItemDto,
    @GetCurrentUser() user: User
  ) {
    const options: TActionOptions = {
      executorId: user.id,
    };

    const item = await this.itemsService.insert({
      params: createItemDto,
      options,
    });

    return {
      data: item,
    };
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: "Lấy danh sách nhiều items" })
  @ApiOkResponse({
    type: FindManyItemResponseDto,
  })
  async findMany(
    @Query() query: FindManyItemDto,
    @GetCurrentUser() user: User
  ) {
    const options: TActionOptions = {};

    if (user.role === Role.USER) {
      query.owner = undefined;
      options.readerId = user.id;
    }

    const data = await this.itemsService.findMany({
      params: query,
      options,
    });

    return {
      data: data.items,
      meta: data.meta,
    };
  }

  @Get(":id")
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: "Lấy thông tin của một item" })
  @ApiOkResponse({
    type: FindItemResponseDto,
  })
  async findOne(@Param("id") id: string, @GetCurrentUser() user: User) {
    const options: TActionOptions = {};

    if (user.role === Role.USER) {
      options.readerId = user.id;
    }

    const item = await this.itemsService.find({
      params: { id },
      options,
    });

    return {
      data: item,
    };
  }

  @Patch(":id")
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: "Cập nhật thông tin của một item" })
  @ApiOkResponse({
    type: FindItemResponseDto,
  })
  async update(
    @Param("id") id: string,
    @Body() updateItemDto: UpdateItemDto,
    @GetCurrentUser() user: User
  ) {
    const options: TActionOptions = {
      executorId: user.id,
    };

    if (user.role === Role.USER) {
      options.readerId = user.id;
    }

    const item = await this.itemsService.update({
      params: {
        id,
        data: updateItemDto,
      },
      options,
    });

    return {
      data: item,
    };
  }

  @Delete(":id")
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: "Xoá thông tin của một item" })
  @ApiOkResponse({
    type: RemoveItemResponseDto,
  })
  async remove(@Param("id") id: string, @GetCurrentUser() user: User) {
    const options: TActionOptions = {
      executorId: user.id,
    };

    if (user.role === Role.USER) {
      options.readerId = user.id;
    }

    const result = await this.itemsService.remove({
      params: { id },
      options,
    });

    return {
      data: result,
    };
  }
}
