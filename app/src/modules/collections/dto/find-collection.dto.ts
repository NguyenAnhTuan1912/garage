import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { Prisma } from "@prisma/client";

// Import common
import { CursorMetaDto } from "src/common/dtos/cursor-meta.dto";

// Import entities
import { Collection } from "../entities/collection.entity";

export class FindManyCollectionDto {
  // @ApiProperty()
  // @IsString({ message: "INVALID_ITEM_TITLE" })
  // @IsOptional()
  // title?: string;

  @ApiProperty({ required: false })
  @IsString({ message: "INVALID_ITEM_OWNER_ID" })
  @IsOptional()
  owner?: string;

  @ApiProperty({ required: false })
  @IsString({ message: "INVALID_ITEM_TOPIC" })
  @IsOptional()
  topic?: string;

  @ApiProperty({ required: false })
  @IsString({ message: "INVALID_ITEM_TYPE" })
  @IsOptional()
  type?: string;

  @ApiProperty({ required: false, default: 0 })
  @IsOptional()
  skip?: number = 0;

  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  take?: number = 10;

  @ApiProperty({ required: false, default: "" })
  @IsOptional()
  cursor?: string;

  @IsOptional()
  where?: Prisma.CollectionWhereInput;
}

export class FindCollectionDto {
  @ApiProperty()
  @IsOptional()
  id?: string;
}

export class FindManyCollectionResponseDto {
  @ApiProperty({ type: [Collection] })
  data: Collection[];

  @ApiProperty()
  meta: CursorMetaDto;
}

export class FindCollectionResponseDto {
  @ApiProperty()
  data: Collection;
}

export class RemoveCollectionResponseDto {
  @ApiProperty()
  data: boolean;
}
