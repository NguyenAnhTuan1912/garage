import { HttpException, HttpStatus } from "@nestjs/common";

export class NotFoundException extends HttpException {
  constructor(entityName: string) {
    super(
      {
        status: HttpStatus.NOT_FOUND,
        error: "Entity Not Found",
        code: `${entityName.toUpperCase()}_NOT_FOUND`,
      },
      HttpStatus.NOT_FOUND
    );
  }
}
