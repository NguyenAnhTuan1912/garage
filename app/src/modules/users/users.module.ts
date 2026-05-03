import { Module } from '@nestjs/common';

// Import controllers
import { UsersController } from './users.controller';

// Import services
import { UsersService } from './users.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { HashService } from 'src/common/services/hash.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, HashService],
  exports: [UsersService]
})
export class UsersModule {}
