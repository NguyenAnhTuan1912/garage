import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { RefreshToken as PrismaRefreshToken, Role as PrismaRole } from "@prisma/client";

export class RefreshToken implements PrismaRefreshToken {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  @Exclude()
  value: string;

  @ApiProperty()
  tokenKey: string;

  @ApiProperty()
  createdAt: Date = new Date();

  @ApiProperty()
  createdBy: string | null;

  @ApiProperty()
  updatedAt: Date | null;

  @ApiProperty()
  updatedBy: string | null;

  @ApiProperty()
  deletedAt: Date | null;

  @ApiProperty()
  deletedBy: string | null;

  // Bạn có thể thêm các property không có trong DB ở đây (Virtual fields)
  constructor(partial: Partial<RefreshToken>) {
    Object.assign(this, partial);
  }
}
