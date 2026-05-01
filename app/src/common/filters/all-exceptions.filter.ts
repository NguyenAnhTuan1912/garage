import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { Prisma } from "@prisma/client";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // 1. Xác định status code mặc định
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    // 2. Xác định body mặc định
    let errorResponse: string | object = "Internal server error";

    // 3. Phân loại và trích xuất thông tin lỗi
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorResponse = exception.getResponse();
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
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
      errorResponse = { message: "Token expired", code: "TOKEN_EXPIRED" };
    } else if (exception?.name === "JsonWebTokenError") {
      status = HttpStatus.UNAUTHORIZED;
      errorResponse = { message: "Invalid token", code: "TOKEN_INVALID" };
    }

    // 4. "Phẳng hóa" (Flatten) dữ liệu để đảm bảo format nhất quán
    const finalData =
      typeof errorResponse === "object"
        ? errorResponse
        : { message: errorResponse };

    // 5. Trả về response cuối cùng
    response.status(status).json({
      success: false,
      statusCode: status,
      ...finalData,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });
  }
}
