import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export type TGetRefreshTokenDecoratorResult = {
  refreshToken: string;
};

/**
 * Decorator dùng để lấy thông tin của refresh token trong cookie.
 */
export const GetRefreshToken = createParamDecorator(
  (data: undefined, context: ExecutionContext): TGetRefreshTokenDecoratorResult => {
    const request = context.switchToHttp().getRequest() as Request;
    const refreshToken = request?.cookies?.["refreshToken"];

    return { refreshToken };
  }
);