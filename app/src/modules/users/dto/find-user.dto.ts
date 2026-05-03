import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsEmail, IsString } from "class-validator";
import { Prisma } from "@prisma/client";

// Import common
import {
  EEmailErrMessage,
  EUserNameErrMessage,
} from "src/common/errors/message-code";
import { CursorMetaDto } from "src/common/dtos/cursor-meta.dto";

// Import entities
import { User } from "../entities/user.entity";

export class FindManyUserDto {
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
  username?: string;
}

export class FindManyUserResponseDto {
  @ApiProperty({ type: [User] })
  data: User[];

  @ApiProperty()
  meta: CursorMetaDto;
}

export class FindUserResponseDto {
  @ApiProperty()
  data: User;
}

export class RemoveUserResponseDto {
  @ApiProperty()
  data: boolean;
}