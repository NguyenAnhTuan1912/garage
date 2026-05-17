import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";
import { $Enums } from "@prisma/client";

export class CreateItemDto {
  @ApiProperty({ type: "string" })
  @IsString({ message: "INVALID_ITEM_COLLECTION_ID" })
  collectionId: string;

  @ApiProperty({ type: "string" })
  @IsString({ message: "INVALID_ITEM_CONTENT" })
  content: string;

  @ApiProperty()
  @IsString({ message: "INVALID_ITEM_TYPE" })
  type: $Enums.CollectionType;

  @ApiProperty({ required: false, type: "string" })
  @IsString({ message: "INVALID_ITEM_DESCRIPTION" })
  @IsOptional()
  description: string | null;
}
