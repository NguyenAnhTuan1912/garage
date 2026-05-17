import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { ApiKey as PrismaApiKey } from "@prisma/client";

// Dùng abstract để không cho phép khởi tạo trực tiếp Base
// Bỏ "implements PrismaApiKey" ở đây để tránh lỗi thiếu 'value'
export abstract class BaseApiKey {
  @ApiProperty()
  id: string;

  @ApiProperty()
  expireAt: Date;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

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

  constructor(partial: Partial<BaseApiKey>) {
    Object.assign(this, partial);
  }
}

// 1. Class thông thường: Ép kiểu PrismaApiKey ở đây
export class ApiKey extends BaseApiKey implements Omit<PrismaApiKey, "value"> {
  @Exclude()
  value: string;

  constructor(partial: Partial<ApiKey>) {
    super(partial);
    Object.assign(this, partial);
  }
}

// 2. Class lúc mới tạo: Hiện value rõ ràng
export class FirstTimeCreateApiKey extends BaseApiKey implements PrismaApiKey {
  @ApiProperty()
  value: string;

  constructor(partial: Partial<FirstTimeCreateApiKey>) {
    super(partial);
    Object.assign(this, partial);
  }
}
