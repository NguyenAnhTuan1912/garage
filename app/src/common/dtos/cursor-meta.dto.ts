import { ApiProperty } from "@nestjs/swagger";

export class CursorMetaDto {
  @ApiProperty()
  hasNextPage: boolean;

  @ApiProperty()
  cursor?: string;
}