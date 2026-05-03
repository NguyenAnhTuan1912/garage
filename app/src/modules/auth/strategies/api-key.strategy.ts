import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { HeaderAPIKeyStrategy } from "passport-headerapikey";

// Import entities
import { User } from "src/modules/users/entities/user.entity";
import { ApiKey } from "../entities/api-key.entity";

// Import services
import { UsersService } from "src/modules/users/users.service";
import { ApiKeyService } from "../api-key/api-key.service";

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  "api-key"
) {
  constructor(
    private usersService: UsersService,
    private apiKeyService: ApiKeyService
  ) {
    super({ header: "x-api-key", prefix: "" }, false);
  }

  async validate(key: string) {
    const apiKey = await this.validateApiKey(key);

    let user: User | null = null;

    try {
      user = await this.usersService.find({
        params: { id: apiKey.createdBy! }
      });
    } catch (error: any) {
      throw new UnauthorizedException({
        code: "NOT_FOUND_ASSOCIATE_USER_APIKEY"
      });
    }

    return user;
  }

  private async validateApiKey(key: string) {
    const result = await this.apiKeyService.verify({
      params: { plain: key },
    });
    let apiKey: ApiKey | null = null;

    if (!result.status)
      throw new UnauthorizedException({
        code: result.code
      });

    try {
      apiKey = await this.apiKeyService.find({
        params: { plain: key }
      });
    } catch (error: any) {
      throw new UnauthorizedException({
        code: "NOT_FOUND_APIKEY"
      });
    }

    return apiKey;
  }
}
