import React from "react";
import { cn } from "@/lib/utils"; // Giả sử bạn có hàm cn của shadcn, nếu không hãy dùng classnames hoặc string template

type TTextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "body"
  | "sub-body"
  | "caption";

interface TTextProps {
  variant?: TTextVariant;
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType; // Cho phép đổi tag HTML nếu cần (ví dụ h1 nhưng muốn render tag h2)
}

const variantConfig: Record<TTextVariant, string> = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  h5: "scroll-m-20 text-lg font-semibold tracking-tight",
  body: "leading-7 [&:not(:first-child)]:mt-6 text-base",
  "sub-body": "text-sm text-muted-foreground leading-6",
  caption: "text-xs font-medium leading-none",
};

export default function Text({
  variant = "body",
  children,
  className,
  as,
}: TTextProps) {
  // Tự động chọn tag HTML phù hợp nếu không chỉ định 'as'
  const Component =
    as || (variant.startsWith("h") ? (variant as React.ElementType) : "p");

  return (
    <Component className={cn(variantConfig[variant], className)}>
      {children}
    </Component>
  );
}
