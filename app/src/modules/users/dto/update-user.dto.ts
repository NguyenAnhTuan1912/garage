import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUrl } from "class-validator";

// Import common
import {
  EDisplayNameErrMessage,
  EPhotoErrMessage,
} from "src/common/errors/message-code/index.js";

export class UpdateUserDto {
  @ApiProperty({ example: "https://avatar.com/tuan.jpg", required: false })
  @IsUrl({}, { message: EPhotoErrMessage.INVALID })
  @IsOptional()
  photo?: string;

  @ApiProperty({ example: "Tuan Garage", required: false })
  @IsString({ message: EDisplayNameErrMessage.INVALID })
  @IsOptional()
  displayName?: string;
}
