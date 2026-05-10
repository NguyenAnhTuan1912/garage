import { Injectable } from "@nestjs/common";
import { nanoid } from "nanoid";
import { addDays, isAfter } from "date-fns";

// Import common
import {
  TServiceActionSchema,
  TGenerateService,
  TActionOptions,
} from "src/common/interfaces/service.interface.js";
import { MissingValueException } from "src/common/errors/class/bad-request.js";

// Import dtos
import { UpdateApiKeyDto } from "../dto/api-key.dto.js";

// Import entities
import { ApiKey, FirstTimeCreateApiKey } from "../entities/api-key.entity.js";

// Import services
import { PrismaService } from "src/common/services/prisma.service.js";
import { KeyHasherService } from "src/common/services/hash.service.js";

interface IApiKeyServiceAction
  extends
    TGenerateService<
      TServiceActionSchema<
        "verify",
        { params: { plain: string } },
        { status: boolean; code?: string }
      >
    >,
    TGenerateService<
      TServiceActionSchema<"find", { params: { plain: string } }, ApiKey>
    >,
    TGenerateService<
      TServiceActionSchema<"findMany", { params: { userId: string } }, ApiKey[]>
    >,
    TGenerateService<
      TServiceActionSchema<
        "insert",
        { params: null; options: TActionOptions },
        ApiKey
      >
    >,
    TGenerateService<
      TServiceActionSchema<
        "update",
        { params: { id: string; data: UpdateApiKeyDto; }; options: TActionOptions },
        ApiKey
      >
    >,
    TGenerateService<
      TServiceActionSchema<
        "delete",
        { params: { id: string }; options: TActionOptions },
        ApiKey
      >
    > {}

@Injectable()
export class ApiKeyService implements IApiKeyServiceAction {
  constructor(
    private prismaService: PrismaService,
    private keyHasherService: KeyHasherService
  ) {}

  async verify(input: Parameters<IApiKeyServiceAction["verify"]>[0]) {
    const { params } = input;
    let apiKey: ApiKey | null = null;

    try {
      apiKey = await this.find({ params: { plain: params.plain } });
    } catch (error) {
      return {
        status: false,
        code: "NOT_FOUND_APIKEY",
      };
    }

    // 1. Check if key is still active
    if (!apiKey.isActive)
      return {
        status: false,
        code: "INACTIVE_APIKEY",
      };

    // 2. Compare key value
    if (!this.keyHasherService.compare(params.plain, apiKey.value))
      return {
        status: false,
        code: "INVALID_APIKEY",
      };

    // 3. Check expire time
    if (apiKey.expireAt && isAfter(new Date(), apiKey.expireAt))
      return {
        status: false,
        code: "EXPIRED_APIKEY",
      };

    // Assume that api key is valid
    return {
      status: true,
    };
  }

  async insert(input: Parameters<IApiKeyServiceAction["insert"]>[0]) {
    const { options } = input;

    if (!options || (options && !options.executorId))
      throw new MissingValueException("executorid");

    const expiresInDays = 365;
    const key = nanoid(64);
    const hashedKey = this.keyHasherService.hash(key);
    const expiresAt = addDays(new Date(), expiresInDays);
    const _newApiKey = await this.prismaService.apiKey.create({
      data: {
        createdBy: options.executorId,
        value: hashedKey,
        expireAt: expiresAt,
        isActive: true
      },
    });

    // Api Key will be send back (user needs to be store it somewhere)
    // because database only stores hashed one

    const newApiKey = new FirstTimeCreateApiKey(_newApiKey);
    newApiKey.value = key;

    return newApiKey;
  }

  async find(input: Parameters<IApiKeyServiceAction["find"]>[0]) {
    const { params } = input;
    const hashedKey = this.keyHasherService.hash(params.plain);
    const apiKey = await this.prismaService.apiKey.findFirstOrThrow({
      where: { value: hashedKey },
    });

    return new ApiKey(apiKey);
  }

  async findMany(input: Parameters<IApiKeyServiceAction["findMany"]>[0]) {
    const { params } = input;
    const apiKeys = await this.prismaService.apiKey.findMany({
      where: { createdBy: params.userId },
    });

    return apiKeys.map((apiKey) => new ApiKey(apiKey));
  }

  async update(input: Parameters<IApiKeyServiceAction["update"]>[0]) {
    const { params, options } = input;

    if (!options || (options && !options.executorId))
      throw new MissingValueException("executorid");

    const apiKey = await this.prismaService.apiKey.update({
      where: { id: params.id },
      data: {
        isActive: params.data.isActive,
        updatedBy: options.executorId
      }
    });

    return new ApiKey(apiKey);
  }

  async delete(input: Parameters<IApiKeyServiceAction["delete"]>[0]) {
    const { params } = input;
    const apiKey = await this.prismaService.apiKey.findFirstOrThrow({
      where: { id: params.id },
    });

    await this.prismaService.apiKey.delete({
      where: { id: params.id },
    });

    return new ApiKey(apiKey);
  }
}
