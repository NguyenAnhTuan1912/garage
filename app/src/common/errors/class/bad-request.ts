import { HttpException, HttpStatus } from "@nestjs/common";

export class MissingValueException extends HttpException {
  constructor(entityName: string) {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        error: "Required Value",
        code: `MISSING_${entityName.toUpperCase()}`,
      },
      HttpStatus.BAD_REQUEST
    );
  }
}

export class InvalidException extends HttpException {
  constructor(entityName: string) {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        error: "Entity Not Found",
        code: `INVALID_${entityName.toUpperCase()}`,
      },
      HttpStatus.BAD_REQUEST
    );
  }
}

export class ExistedException extends HttpException {
  constructor(entityName: string) {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        error: "Existed Entity",
        code: `EXISTED_${entityName.toUpperCase()}`,
      },
      HttpStatus.BAD_REQUEST
    );
  }
}
