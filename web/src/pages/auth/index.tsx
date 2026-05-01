// Import components
import { Card, CardContent } from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";

// Import types
import type { PropsWithChildren } from "react";

export default function AuthPage(props: PropsWithChildren) {
  return (
    <section className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              {props.children}
              <div className="bg-muted relative hidden md:block">
                <img
                  src="/images/sign-in-bg.png"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>
          <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </FieldDescription>
        </div>
      </div>
    </section>
  );
}
