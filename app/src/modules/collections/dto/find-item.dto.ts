import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { Prisma } from "@prisma/client";

// Import common
import { CursorMetaDto } from "src/common/dtos/cursor-meta.dto";

// Import entities
import { Item } from "../entities/item.entity";

export class FindManyItemDto {
  // @ApiProperty()
  // @IsString({ message: "INVALID_ITEM_TITLE" })
  // @IsOptional()
  // title?: string;

  @ApiProperty({ required: false })
  @IsString({ message: "INVALID_ITEM_OWNER_ID" })
  @IsOptional()
  owner?: string;

  @ApiProperty({ required: false })
  @IsString({ message: "INVALID_ITEM_COLLECTION_ID" })
  @IsOptional()
  collectionId?: string;

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
  where?: Prisma.ItemWhereInput;
}

export class FindItemDto {
  @ApiProperty()
  @IsOptional()
  id?: string;
}

export class ItemQueryParamsDto {
  @ApiProperty({ required: false })
  @IsString({ message: "INVALID_ITEM_COLLECTION_ID" })
  @IsOptional()
  collectionId?: string;
}

export class FindManyItemResponseDto {
  @ApiProperty({ type: [Item] })
  data: Item[];

  @ApiProperty()
  meta: CursorMetaDto;
}

export class FindItemResponseDto {
  @ApiProperty()
  data: Item;
}

export class RemoveItemResponseDto {
  @ApiProperty()
  data: boolean;
}
