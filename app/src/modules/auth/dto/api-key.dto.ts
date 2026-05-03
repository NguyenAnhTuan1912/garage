import { ApiProperty } from "@nestjs/swagger";

// Import entities
import { ApiKey, FirstTimeCreateApiKey } from "../entities/api-key.entity";

export class UpdateApiKeyDto {
  @ApiProperty()
  isActive: boolean;
}

export class ApiKeysResponseDto {
  @ApiProperty({ type: [ApiKey] })
  data: ApiKey[];
}

export class ApiKeyResponseDto {
  @ApiProperty()
  data: ApiKey;
}

export class FirstTimeCreateApiKeyResponseDto {
  @ApiProperty()
  data: FirstTimeCreateApiKey;
}