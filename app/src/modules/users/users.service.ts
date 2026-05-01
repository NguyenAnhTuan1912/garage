import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

// Import common
import { PrismaService } from "src/common/services/prisma.service";
import { NotFoundException } from "src/common/errors/class/not-found-error";
import { ExistedException } from "src/common/errors/class/bad-request";
import {
  IBaseCRUDServiceMap,
  TActionOptions,
} from "src/common/interfaces/service.interface";
// Import common/helpers
import { encodeCursor, decodeCursor } from "src/common/helpers/cursor";

// Import DTO
import { CreateUserDto } from "./dto/create-user.dto";
import { FindManyUserDto, FindUserDto } from "./dto/find-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

// Import entities
import { User } from "./entities/user.entity";

interface IUsersServiceSchemaMap {
  find: {
    input: { params: FindUserDto; options?: TActionOptions };
    output: User;
  };
  findMany: {
    input: { params: FindManyUserDto; options?: TActionOptions };
    output: { users: User[]; meta: { hasNextPage: boolean; cursor: string | null; } };
  };
  insert: {
    input: { params: CreateUserDto; options?: TActionOptions };
    output: User;
  };
  update: {
    input: {
      params: { id: string; data: UpdateUserDto };
      options?: TActionOptions;
    };
    output: User;
  };
  remove: {
    input: { params: { id: string }; options?: TActionOptions };
    output: boolean;
  };
}

@Injectable()
export class UsersService implements IBaseCRUDServiceMap<IUsersServiceSchemaMap> {
  constructor(private prisma: PrismaService) {}

  /**
   * Hash the given password.
   * @param password
   * @returns
   */
  async hashPassword(password: string) {
    const round = 12;
    const salt = await bcrypt.genSalt(round);
    const hashed = bcrypt.hash(password, salt);
    return hashed;
  }

  async insert(input: IUsersServiceSchemaMap["insert"]["input"]) {
    const { params, options } = input;
    // Find user
    const user = await this.find({
      params: {
        email: params.email,
        username: params.username,
      },
    });

    if (user) {
      throw new ExistedException("user");
    }

    const { password, ...data } = params;
    const hashed = await this.hashPassword(password);
    const draftUser = new User({
      ...data,
      hashedPassword: hashed,
    });

    if (options && options?.executorId) {
      draftUser.createdBy = options?.executorId;
    }

    const newUser = await this.prisma.user.create({
      data: draftUser,
    });

    return new User(newUser);
  }

  async findMany(input: IUsersServiceSchemaMap["findMany"]["input"]) {
    const { params, options } = input;
    let { take = 10, cursor, ...restParams } = params;
    const where: Prisma.UserWhereInput = {
      ...params.where,
    };

    if (options && !options.includeDeleted) {
      this.prisma.excludeDeleted(where);
    }

    const [createdAt, id] = cursor ? decodeCursor(cursor) : [null, null];
    const users = await this.prisma.user.findMany({
      ...restParams,
      take: take + 1,
      where: {
        ...where,
        ...(createdAt && id ? {
          OR: [
            { createdAt: { lt: createdAt } },
            {
              AND: [
                { createdAt: createdAt },
                { id: { lt: id } },
              ],
            },
          ],
        } : {}),
      },
      orderBy: [
        { createdAt: 'desc' },
        { id: 'desc' },
      ],
    });

    const hasNextPage = users.length > take;
    
    const results = hasNextPage ? users.slice(0, take) : users;

    let nextCursor: string | null = null;
    if (results.length > 0 && hasNextPage) {
      const lastRecord = results[results.length - 1];
      nextCursor = encodeCursor(lastRecord.id, lastRecord.createdAt);
    }

    return {
      users: users.map((user) => new User(user)),
      meta: {
        hasNextPage,
        cursor: nextCursor,
      }
    };
  }

  async find(input: IUsersServiceSchemaMap["find"]["input"]) {
    const { params, options } = input;
    const { email, username, id } = params;
    const where: Prisma.UserWhereInput = {
      OR: [{ email }, { username }, { id }].filter(
        (condition) => Object.values(condition)[0] !== undefined
      ),
    };

    if (options && !options.includeDeleted) {
      this.prisma.excludeDeleted(where);
    }

    const user = await this.prisma.user.findFirst({
      where,
    });

    if (!user) {
      throw new NotFoundException("user");
    }

    return new User(user);
  }

  async update(input: IUsersServiceSchemaMap["update"]["input"]) {
    const { params, options } = input;
    // Find user
    const user = await this.find({ params: { id: params.id } });

    if (!user) {
      throw new NotFoundException("user");
    }

    const newUser = await this.prisma.user.update({
      data: {
        ...params.data,
        updatedBy: options?.executorId,
      },
      where: { id: params.id, deletedAt: null },
    });

    return new User(newUser);
  }

  async remove(input: IUsersServiceSchemaMap["remove"]["input"]) {
    const { params, options } = input;
    // Find user
    const user = await this.find({ params: { id: params.id } });

    if (!user) {
      throw new NotFoundException("user");
    }

    await this.prisma.user.update({
      data: { deletedAt: new Date() },
      where: { id: params.id },
    });

    return true;
  }
}
