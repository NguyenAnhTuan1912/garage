import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsEnum,
} from "class-validator";
import { Role } from "@prisma/client";

// Import common
import {
  EEmailErrMessage,
  EUserNameErrMessage,
  EDisplayNameErrMessage,
  EFullNameErrMessage,
  EPasswordErrMessage,
} from "src/common/errors/message-code";

export class CreateUserDto {
  @ApiProperty({
    example: "admin@garage.com",
    description: "Email của người dùng",
  })
  @IsEmail({}, { message: EEmailErrMessage.INVALID })
  @IsNotEmpty({ message: EEmailErrMessage.EMPTY })
  email!: string;

  @ApiProperty({
    example: "admin@garage.com",
    description: "Email của người dùng",
  })
  @MinLength(3, { message: EUserNameErrMessage.MIN_LENGTH })
  @IsNotEmpty({ message: EUserNameErrMessage.EMPTY })
  username!: string;

  @ApiProperty({
    example: "password123",
    description: "Mật khẩu ít nhất 6 ký tự",
  })
  @IsString()
  @MinLength(6, { message: EPasswordErrMessage.MIN_LENGTH })
  password!: string;

  @ApiProperty({ example: "Nguyen Anh Tuan", description: "Họ và tên" })
  @IsString({ message: EFullNameErrMessage.INVALID })
  @IsNotEmpty({ message: EFullNameErrMessage.EMPTY })
  fullName!: string;

  @ApiProperty({ example: "Tuan Admin", required: false })
  @IsString({ message: EDisplayNameErrMessage.INVALID })
  @IsOptional()
  displayName?: string;

  @ApiProperty({ enum: Role, default: Role.USER })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
