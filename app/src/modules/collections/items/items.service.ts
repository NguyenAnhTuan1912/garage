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
import { CreateItemDto } from "../dto/create-item.dto";
import {
  FindItemDto,
  FindManyItemDto,
} from "../dto/find-item.dto";
import { UpdateItemDto } from "../dto/update-item.dto";

// Import entities
import { Item } from "../entities/item.entity";

// Import services
import { PrismaService } from "src/common/services/prisma.service";

interface IItemsServiceSchemaMap {
  find: {
    input: { params: FindItemDto; options?: TActionOptions };
    output: Item;
  };
  findMany: {
    input: { params: FindManyItemDto; options?: TActionOptions };
    output: {
      items: Item[];
      meta: { hasNextPage: boolean; cursor: string | null };
    };
  };
  insert: {
    input: { params: CreateItemDto; options: TActionOptions };
    output: Item;
  };
  update: {
    input: {
      params: { id: string; data: UpdateItemDto };
      options: TActionOptions;
    };
    output: Item;
  };
  remove: {
    input: { params: { id: string }; options: TActionOptions };
    output: boolean;
  };
}

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async insert(input: IItemsServiceSchemaMap["insert"]["input"]) {
      const { params, options } = input;
      const draftItem = new Item(params);
  
      if (options?.executorId) {
        draftItem.createdBy = options.executorId;
      }
  
      const newItem = await this.prisma.item.create({
        data: draftItem,
      });
  
      return new Item(newItem);
    }
  
    async findMany(input: IItemsServiceSchemaMap["findMany"]["input"]) {
      const { params, options } = input;
      let { take = 10, cursor, ...restParams } = params;
      const where: Prisma.ItemWhereInput = {
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
  
      const [createdAt, id] = cursor ? decodeCursor(cursor) : [null, null];
      const items = await this.prisma.item.findMany({
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
  
      const hasNextPage = items.length > take;
  
      const results = hasNextPage ? items.slice(0, take) : items;
  
      let nextCursor: string | null = null;
      if (results.length > 0 && hasNextPage) {
        const lastRecord = results[results.length - 1];
        nextCursor = encodeCursor(lastRecord.id, lastRecord.createdAt);
      }
  
      return {
        items: items.map((item) => new Item(item)),
        meta: {
          hasNextPage,
          cursor: nextCursor,
        },
      };
    }
  
    async find(input: IItemsServiceSchemaMap["find"]["input"]) {
      const { params, options } = input;
      const { id } = params;
      const where: Prisma.ItemWhereInput = {
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
  
      const item = await this.prisma.item.findFirst({
        where,
      });
  
      if (!item) {
        throw new NotFoundException("item");
      }
  
      return new Item(item);
    }
  
    async update(input: IItemsServiceSchemaMap["update"]["input"]) {
      const { params, options } = input;
  
      // Find item
      const item = await this.find({ params: { id: params.id }, options });
  
      if (!item) {
        throw new NotFoundException("item");
      }
  
      const newItem = await this.prisma.item.update({
        data: {
          ...params.data,
          updatedBy: options?.executorId,
        },
        where: { id: params.id, deletedAt: null },
      });
  
      return new Item(newItem);
    }
  
    async remove(input: IItemsServiceSchemaMap["remove"]["input"]) {
      const { params, options } = input;
      // Find item
      const item = await this.find({ params: { id: params.id }, options });
  
      if (!item) {
        throw new NotFoundException("item");
      }
  
      await this.prisma.item.update({
        data: { deletedAt: new Date() },
        where: { id: params.id },
      });
  
      return true;
    }
}
