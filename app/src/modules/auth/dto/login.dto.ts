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
