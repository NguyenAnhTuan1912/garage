import { HttpException, HttpStatus } from "@nestjs/common";

export class NotFoundException extends HttpException {
  constructor(entityName: string) {
    super(
      {
        status: HttpStatus.NOT_FOUND,
        error: "Entity Not Found",
        code: `NOT_FOUND_${entityName.toUpperCase()}`,
      },
      HttpStatus.NOT_FOUND
    );
  }
}
