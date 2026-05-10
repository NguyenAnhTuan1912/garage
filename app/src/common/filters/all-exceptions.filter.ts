import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // console.log("Exception:", { ...exception });
    // console.log("Instance Of:", Object.getPrototypeOf(exception));

    // 1. Xác định status code mặc định
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    // 2. Xác định body mặc định
    let errorResponse: string | object = "Internal server error";

    // 3. Phân loại và trích xuất thông tin lỗi
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      // Xử lý lỗi từ Prisma
      if (exception.code === "P2025") {
        status = HttpStatus.NOT_FOUND;
        errorResponse = { message: "Resource not found", code: "PRISMA_P2025" };
      } else {
        status = HttpStatus.BAD_REQUEST;
        errorResponse = {
          message: "Database request error",
          code: `PRISMA_${exception.code}`,
        };
      }
    } else if (exception?.name === "TokenExpiredError") {
      status = HttpStatus.UNAUTHORIZED;
      errorResponse = { message: "Token expired", code: "EXPIRED_TOKEN" };
    } else if (
      exception?.name === "JsonWebTokenError" ||
      exception?.name === "UnauthorizedException"
    ) {
      status = HttpStatus.UNAUTHORIZED;
      errorResponse = {
        message: "Invalid token",
        code: exception.response?.code || "INVALID_TOKEN",
      };
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorResponse = exception.getResponse();

      // Standardize error object
      if (typeof errorResponse === "object") {
        (errorResponse as any).code = Array.isArray(
          (errorResponse as any).message
        )
          ? (errorResponse as any).message[0]
          : (errorResponse as any).message;

        (errorResponse as any).message = exception.message;
      }
    }

    // 4. "Phẳng hóa" (Flatten) dữ liệu để đảm bảo format nhất quán
    const finalData =
      typeof errorResponse === "object"
        ? errorResponse
        : { message: errorResponse };

    this.logError(exception, request, status);

    const resBody = {
      error: {
        success: false,
        statusCode: status,
        ...finalData,
        timestamp: new Date().toISOString(),
        path: ctx.getRequest().url,
      },
    };

    // 5. Trả về response cuối cùng
    response.status(status).json(resBody);
  }

  private logError(exception: any, request: Request, status: number) {
    const { method, url, body, user } = request;
    const userId = (user as any)?.id || "Guest";

    const logMessage = `[${method}] ${url} - Status: ${status} - User: ${userId} - Message: ${
      exception instanceof HttpException
        ? exception.message
        : exception?.message || "Unknown Error"
    }`;

    if (status >= 500) {
      this.logger.error(logMessage, exception?.stack);
    } else if (status >= 400) {
      this.logger.warn(logMessage);
    }
  }
}
