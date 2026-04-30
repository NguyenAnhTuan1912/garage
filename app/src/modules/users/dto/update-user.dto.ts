import { PartialType, ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUrl } from "class-validator";

// Import common
import {
  EDisplayNameErrMessage,
  EPhotoErrMessage,
} from "src/common/errors/message-code/index.js";

// Import DTO
import { CreateUserDto } from "./create-user.dto.js";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: "https://avatar.com/tuan.jpg", required: false })
  @IsUrl({}, { message: EPhotoErrMessage.INVALID })
  @IsOptional()
  photo?: string;

  @ApiProperty({ example: "Tuan Garage", required: false })
  @IsString({ message: EDisplayNameErrMessage.INVALID })
  @IsOptional()
  displayName?: string;
}
