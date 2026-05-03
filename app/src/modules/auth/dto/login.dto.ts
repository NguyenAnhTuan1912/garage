import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, MinLength } from "class-validator";

// Import common
import {
  EEmailErrMessage,
  EUserNameErrMessage,
  EDisplayNameErrMessage,
  EFullNameErrMessage,
  EPasswordErrMessage,
} from "src/common/errors/message-code";

// Import entities
import { User } from "src/modules/users/entities/user.entity";

export class LoginDto {
  @ApiProperty()
  @IsString({ message: EUserNameErrMessage.INVALID })
  username: string;

  @ApiProperty()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @MinLength(6, { message: EPasswordErrMessage.MIN_LENGTH })
  password: string;
}

export class AuthResultDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  user: User;
};

export class AuthResponseDto {
  @ApiProperty()
  data: AuthResultDto;
}