import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsEmail, IsString } from "class-validator";
import { Prisma } from "@prisma/client";

// Import common
import {
  EEmailErrMessage,
  EUserNameErrMessage,
  EDisplayNameErrMessage,
  EFullNameErrMessage,
  EPasswordErrMessage,
} from "src/common/errors/message-code";

export class FindManyUserDto {
  @ApiProperty()
  @IsOptional()
  skip?: number = 0;

  @ApiProperty()
  @IsOptional()
  take?: number = 10;

  @IsOptional()
  cursor?: Prisma.UserWhereUniqueInput;

  @IsOptional()
  where?: Prisma.UserWhereInput;
}

export class FindUserDto {
  @ApiProperty()
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsEmail({}, { message: EEmailErrMessage.INVALID })
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsString({ message: EUserNameErrMessage.INVALID })
  @IsOptional()
  username?: string
}
