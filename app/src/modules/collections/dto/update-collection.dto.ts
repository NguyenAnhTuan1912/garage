import { PartialType } from "@nestjs/swagger";

// Import DTO
import { CreateCollectionDto } from "./create-collection.dto";

export class UpdateCollectionDto extends PartialType(CreateCollectionDto) {}
