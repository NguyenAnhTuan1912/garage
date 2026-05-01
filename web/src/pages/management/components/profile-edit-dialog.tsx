import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { Edit } from "lucide-react";

// Import components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerFormElement } from "@/components/date-picker";

// Import helpers / utils
import { wait } from "@/utils/other";

// Import types
import type { TUser } from "@/modules/user/type";

export type TProfileEditDialogProps = {
  profileId?: string;
  profile?: TUser;
};

const genders = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Other",
    value: "other",
  },
] as const;

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full Name must be at least 2 characters.")
    .max(64, "Full Name must be at most 64 characters."),
  gender: z.string().refine((val) => val !== "auto", {
    message: "Auto-detection is not allowed. Please choose your gender..",
  }),
  birthDate: z.date().refine(
    (d) => {
      const now = new Date();
      const sixTeenYearAgo = new Date(
        now.getFullYear() - 16,
        now.getMonth(),
        now.getDate()
      );
      return d <= sixTeenYearAgo;
    },
    {
      message: "You must be enough 16 years old.",
    }
  ),
});

export default function ProfileEditDialog(props: TProfileEditDialogProps) {
  const form = useForm({
    defaultValues: {
      fullName: props.profile?.fullName,
      gender: props.profile?.gender,
      birthDate: new Date(props.profile?.birthDate || ""),
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("Value:", value);

      toast.promise(wait(2000), {
        toasterId: "global",
        loading: "Updating your profile ...",
        success() {
          return "Your profile is updated";
        },
        error: "Cannot update your profile",
      });
    },
  });

  useEffect(() => {
    return () => {
      form.reset();
    };
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer p-0" variant="link">
          <Edit /> Edit my profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(e);
          }}
        >
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 my-4">
            <form.Field
              name="fullName"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Your full name"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="gender"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field orientation="responsive" data-invalid={isInvalid}>
                    <FieldContent>
                      <FieldLabel htmlFor="gender">Gender</FieldLabel>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldContent>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger
                        id="gender"
                        aria-invalid={isInvalid}
                        className="min-w-[120px]"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        <SelectSeparator />
                        {genders.map((gender) => (
                          <SelectItem key={gender.value} value={gender.value}>
                            {gender.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                );
              }}
            />
            <form.Field
              name="birthDate"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <DatePickerFormElement
                      label="Date of birth"
                      field={field}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </div>
          <DialogFooter className="flex items-center">
            <DialogClose className="cursor-pointer" asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button className="cursor-pointer" type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
