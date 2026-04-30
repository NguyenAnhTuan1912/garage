import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

// Import common
import { PrismaService } from "src/common/services/prisma.service";
import { NotFoundException } from "src/common/errors/class/not-found-error";
import { ExistedException } from "src/common/errors/class/bad-request";

// Import DTO
import { CreateUserDto } from "./dto/create-user.dto";
import { FindManyUserDto, FindUserDto } from "./dto/find-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

// Import entities
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
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

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Find user
    const user = await this.find({
      email: createUserDto.email,
      username: createUserDto.username,
    });

    if (user) {
      throw new ExistedException("user");
    }

    const { password, ...data } = createUserDto;
    const hashed = await this.hashPassword(password);
    const input = new User({
      ...data,
      hashedPassword: hashed,
    });
    const newUser = await this.prisma.user.create({
      data: input,
    });

    return new User(newUser);
  }

  async findMany(
    params: FindManyUserDto,
    options?: { includeDeleted: boolean }
  ): Promise<User[]> {
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

  async find(
    params: FindUserDto,
    options?: { includeDeleted: boolean }
  ): Promise<User> {
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

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Find user
    const user = await this.find({ id });

    if (!user) {
      throw new NotFoundException("user");
    }

    const newUser = await this.prisma.user.update({
      data: updateUserDto,
      where: { id, deletedAt: null },
    });

    return new User(newUser);
  }

  async remove(id: string) {
    // Find user
    const user = await this.find({ id });

    if (!user) {
      throw new NotFoundException("user");
    }

    const newUser = await this.prisma.user.update({
      data: { deletedAt: new Date() },
      where: { id },
    });

    return new User(newUser);
  }
}
