import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { $Enums, Collection as PrismaCollection } from "@prisma/client";

export class Collection implements PrismaCollection {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  topic: string | null;

  @ApiProperty()
  photo: string | null;

  @ApiProperty()
  type: $Enums.CollectionType;

  @ApiProperty()
  createdAt: Date = new Date();

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  updatedAt: Date | null;

  @ApiProperty()
  @Exclude()
  updatedBy: string | null;

  @ApiProperty()
  @Exclude()
  deletedAt: Date | null;

  @ApiProperty()
  @Exclude()
  deletedBy: string | null;

  constructor(partial: Partial<Collection>) {
    Object.assign(this, partial);
  }
}
