import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

// Import common
import { NotFoundException } from "src/common/errors/class/not-found-error";
import { ExistedException } from "src/common/errors/class/bad-request";
import {
  IBaseCRUDServiceMap,
  TActionOptions,
} from "src/common/interfaces/service.interface";
// Import common/helpers
import { encodeCursor, decodeCursor } from "src/common/helpers/cursor";

// Import DTO
import { CreateCollectionDto } from "./dto/create-collection.dto";
import {
  FindCollectionDto,
  FindManyCollectionDto,
} from "./dto/find-collection.dto";
import { UpdateCollectionDto } from "./dto/update-collection.dto";

// Import entities
import { Collection } from "./entities/collection.entity";

// Import services
import { PrismaService } from "src/common/services/prisma.service";

interface ICollectionsServiceSchemaMap {
  find: {
    input: { params: FindCollectionDto; options?: TActionOptions };
    output: Collection;
  };
  findMany: {
    input: { params: FindManyCollectionDto; options?: TActionOptions };
    output: {
      collections: Collection[];
      meta: { hasNextPage: boolean; cursor: string | null };
    };
  };
  insert: {
    input: { params: CreateCollectionDto; options: TActionOptions };
    output: Collection;
  };
  update: {
    input: {
      params: { id: string; data: UpdateCollectionDto };
      options: TActionOptions;
    };
    output: Collection;
  };
  remove: {
    input: { params: { id: string }; options: TActionOptions };
    output: boolean;
  };
}

@Injectable()
export class CollectionsService {
  constructor(private prisma: PrismaService) {}

  async insert(input: ICollectionsServiceSchemaMap["insert"]["input"]) {
    const { params, options } = input;
    const draftCollection = new Collection(params);

    if (options?.executorId) {
      draftCollection.createdBy = options.executorId;
    }

    const newCollection = await this.prisma.collection.create({
      data: draftCollection,
    });

    return new Collection(newCollection);
  }

  async findMany(input: ICollectionsServiceSchemaMap["findMany"]["input"]) {
    const { params, options } = input;
    let { take = 10, cursor, ...restParams } = params;
    const where: Prisma.CollectionWhereInput = {
      ...params.where,
    };

    if (options && !options.includeDeleted) {
      this.prisma.excludeDeleted(where);
    }

    if (options && options.readerId) {
      where.createdBy = options.readerId;
    }

    if (restParams.owner) {
      where.createdBy = restParams.owner;
    }

    if (restParams.topic) {
      where.topic = restParams.topic;
    }

    const [createdAt, id] = cursor ? decodeCursor(cursor) : [null, null];
    const collections = await this.prisma.collection.findMany({
      take: take + 1,
      where: {
        ...where,
        ...(createdAt && id
          ? {
              OR: [
                { createdAt: { lt: createdAt } },
                {
                  AND: [{ createdAt: createdAt }, { id: { lt: id } }],
                },
              ],
            }
          : {}),
      },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    });

    const hasNextPage = collections.length > take;

    const results = hasNextPage ? collections.slice(0, take) : collections;

    let nextCursor: string | null = null;
    if (results.length > 0 && hasNextPage) {
      const lastRecord = results[results.length - 1];
      nextCursor = encodeCursor(lastRecord.id, lastRecord.createdAt);
    }

    return {
      collections: collections.map((collection) => new Collection(collection)),
      meta: {
        hasNextPage,
        cursor: nextCursor,
      },
    };
  }

  async find(input: ICollectionsServiceSchemaMap["find"]["input"]) {
    const { params, options } = input;
    const { id } = params;
    const where: Prisma.CollectionWhereInput = {
      OR: [{ id }].filter(
        (condition) => Object.values(condition)[0] !== undefined
      ),
    };

    if (options && !options.includeDeleted) {
      this.prisma.excludeDeleted(where);
    }

    if (options && options.readerId) {
      where.createdBy = options.readerId;
    }

    const collection = await this.prisma.collection.findFirst({
      where,
    });

    if (!collection) {
      throw new NotFoundException("collection");
    }

    return new Collection(collection);
  }

  async update(input: ICollectionsServiceSchemaMap["update"]["input"]) {
    const { params, options } = input;

    // Find collection
    const collection = await this.find({ params: { id: params.id }, options });

    if (!collection) {
      throw new NotFoundException("collection");
    }

    const newCollection = await this.prisma.collection.update({
      data: {
        ...params.data,
        updatedBy: options?.executorId,
      },
      where: { id: params.id, deletedAt: null },
    });

    return new Collection(newCollection);
  }

  async remove(input: ICollectionsServiceSchemaMap["remove"]["input"]) {
    const { params, options } = input;
    // Find collection
    const collection = await this.find({ params: { id: params.id }, options });

    if (!collection) {
      throw new NotFoundException("collection");
    }

    await this.prisma.collection.update({
      data: { deletedAt: new Date() },
      where: { id: params.id },
    });

    return true;
  }
}
