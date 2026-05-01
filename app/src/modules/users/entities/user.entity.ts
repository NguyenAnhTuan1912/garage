import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { User as PrismaUser, Role as PrismaRole } from "@prisma/client";

export class User implements PrismaUser {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @Exclude()
  hashedPassword: string;

  @ApiProperty()
  displayName: string | null;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  photo: string | null;

  @ApiProperty({ enum: PrismaRole })
  role: PrismaRole = PrismaRole.USER;

  @ApiProperty()
  createdAt: Date = new Date();

  @ApiProperty()
  @Exclude()
  createdBy: string | null;

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

  // Bạn có thể thêm các property không có trong DB ở đây (Virtual fields)
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
