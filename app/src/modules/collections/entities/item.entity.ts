import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { $Enums, Item as PrismaItem } from "@prisma/client";

export class Item implements PrismaItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  content: string;

  @ApiProperty()
  type: $Enums.CollectionType;

  @ApiProperty()
  collectionId: string;

  @ApiProperty()
  createdAt: Date = new Date();

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  @Exclude()
  updatedBy: string | null;

  @ApiProperty()
  @Exclude()
  deletedAt: Date | null;

  @ApiProperty()
  @Exclude()
  deletedBy: string | null;

  constructor(partial: Partial<Item>) {
    Object.assign(this, partial);
  }
}
