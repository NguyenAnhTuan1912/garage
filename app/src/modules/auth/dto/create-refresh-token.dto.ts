import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, MinLength } from "class-validator";

// Import common
import {
  EUserIdErrMessage
} from "src/common/errors/message-code";

export class CreateRefreshTokenDto {
  @ApiProperty()
  @IsString({ message: EUserIdErrMessage.INVALID })
  userId: string;

  @ApiProperty()
  @IsString({ message: EUserIdErrMessage.INVALID })
  value: string;
}
