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
    output: User[];
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
    const where: Prisma.UserWhereInput = {
      ...params.where,
    };

    if (options && !options.includeDeleted) {
      this.prisma.excludeDeleted(where);
    }

    const users = await this.prisma.user.findMany({
      ...params,
      where,
    });

    return users.map((user) => new User(user));
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
