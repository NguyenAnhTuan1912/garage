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
import { Prisma, $Enums, Role } from "@prisma/client";

// Import decorators
import { Roles } from "src/common/decorators/roles.decorator";
import { GetCurrentUser } from "src/common/decorators/current-user.decorator";

// IMport DTO
import { CreateCollectionDto } from "./dto/create-collection.dto";
import {
  FindManyCollectionDto,
  FindCollectionResponseDto,
  FindManyCollectionResponseDto,
  RemoveCollectionResponseDto,
} from "./dto/find-collection.dto";
import { UpdateCollectionDto } from "./dto/update-collection.dto";

// Import entities
import { Collection } from "./entities/collection.entity";
import { User } from "../users/entities/user.entity";

// Import guards
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";

// Import services
import { CollectionsService } from "./collections.service";

// Import types
import { TActionOptions } from "src/common/interfaces/service.interface";

@Controller("collections")
@UseGuards(RolesGuard)
@ApiTags("Collection")
@ApiBearerAuth()
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get("types")
  @Roles(Role.ADMIN, Role.USER)
  async getTypes() {
    return {
      data: $Enums.CollectionType
    }
  }

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: "Tạo một collection mới" })
  @ApiOkResponse({
    type: FindCollectionResponseDto,
  })
  async create(
    @Body() createCollectionDto: CreateCollectionDto,
    @GetCurrentUser() user: User
  ) {
    const options: TActionOptions = {
      executorId: user.id,
    };

    const collection = await this.collectionsService.insert({
      params: createCollectionDto,
      options,
    });

    return {
      data: collection,
    };
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: "Lấy danh sách nhiều collections" })
  @ApiOkResponse({
    type: FindManyCollectionResponseDto,
  })
  async findMany(
    @Query() query: FindManyCollectionDto,
    @GetCurrentUser() user: User
  ) {
    const options: TActionOptions = {};

    if (user.role === Role.USER) {
      query.owner = undefined;
      options.readerId = user.id;
    }

    const data = await this.collectionsService.findMany({
      params: query,
      options,
    });

    return {
      data: data.collections,
      meta: data.meta,
    };
  }

  @Get(":id")
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: "Lấy thông tin của một collection" })
  @ApiOkResponse({
    type: FindCollectionResponseDto,
  })
  async findOne(@Param("id") id: string, @GetCurrentUser() user: User) {
    const options: TActionOptions = {};

    if (user.role === Role.USER) {
      options.readerId = user.id;
    }

    const collection = await this.collectionsService.find({
      params: { id },
      options,
    });

    return {
      data: collection,
    };
  }

  @Patch(":id")
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: "Cập nhật thông tin của một collection" })
  @ApiOkResponse({
    type: FindCollectionResponseDto,
  })
  async update(
    @Param("id") id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
    @GetCurrentUser() user: User
  ) {
    const options: TActionOptions = {
      executorId: user.id,
    };

    if (user.role === Role.USER) {
      options.readerId = user.id;
    }

    const collection = await this.collectionsService.update({
      params: {
        id,
        data: updateCollectionDto,
      },
      options,
    });

    return {
      data: collection,
    };
  }

  @Delete(":id")
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: "Xoá thông tin của một collection" })
  @ApiOkResponse({
    type: RemoveCollectionResponseDto,
  })
  async remove(@Param("id") id: string, @GetCurrentUser() user: User) {
    const options: TActionOptions = {
      executorId: user.id,
    };

    if (user.role === Role.USER) {
      options.readerId = user.id;
    }

    const result = await this.collectionsService.remove({
      params: { id },
      options,
    });

    return {
      data: result,
    };
  }
}
