import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";
import { $Enums } from "@prisma/client";

export class CreateCollectionDto {
  @ApiProperty()
  @IsString({ message: "INVALID_COLLECTION_TITLE" })
  title: string;

  @ApiProperty({ required: false, type: "string" })
  @IsString({ message: "INVALID_COLLECTION_CONTENT" })
  @IsOptional()
  description: string | null;

  @ApiProperty({ required: false })
  @IsString({ message: "INVALID_COLLECTION_TOPIC" })
  @IsOptional()
  topic: string | null;

  @ApiProperty()
  @IsString({ message: "INVALID_COLLECTION_TYPE" })
  type: $Enums.CollectionType;

  @ApiProperty()
  @IsString({ message: "INVALID_COLLECTION_PHOTO_URL" })
  @IsOptional()
  photo?: string;
}
