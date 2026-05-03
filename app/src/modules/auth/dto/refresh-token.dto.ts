import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, MinLength } from "class-validator";

// Import common
import {
  EUserIdErrMessage,
  ERefreshTokenErrMessage,
} from "src/common/errors/message-code";

export class CreateRefreshTokenDto {
  @ApiProperty()
  @IsString({ message: EUserIdErrMessage.INVALID })
  userId: string;

  @IsString()
  value: string;

  @IsString()
  tokenKey: string;
}

export class UpdateRefreshTokenDto {
  @IsString({ message: ERefreshTokenErrMessage.INVALID })
  @IsOptional()
  value?: string;

  @IsString()
  tokenKey: string;
}

export class PerformTokenRefreshDto {
  @ApiProperty()
  @IsString({ message: ERefreshTokenErrMessage.INVALID })
  refreshToken: string;
}
