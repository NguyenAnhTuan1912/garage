import { PartialType } from "@nestjs/swagger";

// Import DTO
import { CreateItemDto } from "./create-item.dto";

export class UpdateItemDto extends PartialType(CreateItemDto) {}
