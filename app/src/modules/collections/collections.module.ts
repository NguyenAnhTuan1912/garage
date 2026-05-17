import { Module } from "@nestjs/common";

// Import controllers
import { CollectionsController } from "./collections.controller";

// Import services
import { CollectionsService } from "./collections.service";
import { PrismaService } from "src/common/services/prisma.service";
import { ItemsService } from './items/items.service';
import { ItemsController } from './items/items.controller';

@Module({
  controllers: [CollectionsController, ItemsController],
  providers: [CollectionsService, PrismaService, ItemsService],
})
export class CollectionsModule {}
