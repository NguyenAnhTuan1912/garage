import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

// Import entities
import { ApiKey, FirstTimeCreateApiKey } from "../entities/api-key.entity";

export class UpdateApiKeyDto {
  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}

export class ApiKeysResponseDto {
  @ApiProperty({ type: [ApiKey] })
  data: ApiKey[];
}

export class ApiKeyResponseDto {
  @ApiProperty({ type: [ApiKey] })
  data: ApiKey;
}

export class FirstTimeCreateApiKeyResponseDto {
  @ApiProperty()
  data: FirstTimeCreateApiKey;
}