import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

// Import components
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

// Import modules
import { useSignInMutation } from "@/modules/auth/query";

// Import helpers / utils
import { cn } from "@/lib/utils";

// Import types
import type { AxiosError, AxiosResponse } from "axios";

export const signInSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters").max(64),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const signInMutation = useSignInMutation();

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    validators: {
      onSubmit: signInSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const res: AxiosResponse = await signInMutation.mutateAsync(value);
        const data = res.data.data as any;

        toast.success(data.message, { toasterId: "global" });
      } catch (e) {
        const err = e as AxiosError;
        const data = err.response?.data as any;

        toast.error(data?.error?.message ?? "Login failed", {
          toasterId: "global",
        });
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form
        className="p-6 md:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(e);
        }}
      >
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground text-balance">
              Login to your Tnditor account
            </p>
          </div>

          {/* Username */}
          <form.Field
            name="username"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled={signInMutation.isPending}
                    placeholder="myusername"
                    aria-invalid={isInvalid}
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          {/* Password */}
          <form.Field
            name="password"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <div className="flex items-center">
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-2 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled={signInMutation.isPending}
                    autoComplete="off"
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          {/* Submit */}
          <Field>
            <Button type="submit" disabled={signInMutation.isPending}>
              {signInMutation.isPending && <Spinner />}
              Login
            </Button>
          </Field>

          <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
            Or continue with
          </FieldSeparator>

          {/* Social buttons (giữ nguyên) */}
          {/* ... */}

          <FieldDescription className="text-center">
            Don&apos;t have an account? <a href="#">Sign up</a>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  );
}
