import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * Decorator dùng để lấy ID của người dùng hiện tại từ Request.
 * Yêu cầu: Route phải được bảo vệ bởi JwtAuthGuard để Passport gán thông tin user vào request.
 */
export const GetCurrentUserId = createParamDecorator(
  (data: undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Trong Passport JwtStrategy, chúng ta đã map payload.sub thành user.id
    return user?.id;
  }
);
