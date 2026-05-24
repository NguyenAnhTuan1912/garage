import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

// Import components
import { Button } from "@/shared/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldSeparator,
  FieldError,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import { Spinner } from "@/shared/components/ui/spinner";

// Import modules
import {
  useCollectionTypesQuery,
  useCreateCollectionMutation,
} from "@/shared/modules/collection/query";

// Import states
import { useWorkbenchState } from "@/extension/state/workbench";

// Import types
import type { AxiosError } from "axios";
import type { TCreateCollection } from "@/shared/modules/collection/type";

export const createCollectionSchema = z.object({
  type: z.string({ error: "Collection type is required" }),
  title: z
    .string({ error: "Title type is required" })
    .min(1, "Length of title must be more than 1"),
  description: z.string().optional(),
  topic: z.string().optional(),
  photo: z.string().optional(),
});

export default function CollectionForm() {
  const { data: collectionTypesRes, isPending } = useCollectionTypesQuery();
  const { mutateAsync: createCollection } = useCreateCollectionMutation();
  const { sectionDefaultFormData } = useWorkbenchState();

  const collectionTypes = collectionTypesRes?.data.data;
  const buttonLabel = sectionDefaultFormData ? "Edit" : "Create";
  const pendingButtonLabel = sectionDefaultFormData ? "Editting" : "Creating";

  const form = useForm({
    defaultValues: {
      title: sectionDefaultFormData ? sectionDefaultFormData.title : "",
      type: sectionDefaultFormData ? sectionDefaultFormData.type : "",
      description: sectionDefaultFormData
        ? sectionDefaultFormData.description
        : "",
      topic: sectionDefaultFormData ? sectionDefaultFormData.topic : "",
      photo: sectionDefaultFormData ? sectionDefaultFormData.photo : "",
    } as TCreateCollection,
    validators: {
      onSubmit: createCollectionSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        console.log("Value:", value);

        await createCollection(value);

        toast.success("Create collection successfully", {
          toasterId: "global",
        });

        form.reset();
      } catch (e) {
        const err = e as AxiosError;
        const data = err.response?.data as any;

        toast.error(data?.error?.message ?? "Failed to create new collection", {
          toasterId: "global",
        });
      }
    },
  });

  return (
    <form
      className="flex w-full flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(e);
      }}
    >
      <form.Field
        name="title"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>
                <p>
                  Title<sup className="text-red-500">*</sup>
                </p>
              </FieldLabel>
              <Input
                className="rounded-lg text-sm"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={isPending}
                placeholder="Title of collection ..."
                aria-invalid={isInvalid}
                autoComplete="off"
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      />

      <form.Field
        name="type"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>
                <p>
                  Type<sup className="text-red-500">*</sup>
                </p>
              </FieldLabel>
              <Select
                name={field.name}
                value={field.state.value}
                onValueChange={field.handleChange}
                disabled={isPending}
              >
                <SelectTrigger
                  id={field.name}
                  className="rounded-lg text-sm"
                  aria-invalid={isInvalid}
                >
                  <SelectValue placeholder="Collection type" />
                </SelectTrigger>
                <SelectContent className="rounded-lg text-sm">
                  <SelectGroup>
                    {collectionTypes &&
                      collectionTypes.map((type) => (
                        <SelectItem
                          key={type.value}
                          className="rounded-lg text-sm"
                          value={type.value}
                        >
                          {type.label}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      />

      <form.Field
        name="topic"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel className="text-gray-500" htmlFor={field.name}>
                Topic {"(Optional)"}
              </FieldLabel>
              <Input
                className="rounded-lg text-sm"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={isPending}
                placeholder="Title of collection ..."
                aria-invalid={isInvalid}
                autoComplete="off"
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      />

      <form.Field
        name="description"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel className="text-gray-500" htmlFor={field.name}>
                Description {"(Optional)"}
              </FieldLabel>
              <Textarea
                className="rounded-lg text-sm"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={isPending}
                placeholder="Title of collection ..."
                aria-invalid={isInvalid}
                autoComplete="off"
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      />

      <form.Field
        name="photo"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel className="text-gray-500" htmlFor={field.name}>
                Photo's URL {"(Optional)"}
              </FieldLabel>
              <Input
                className="rounded-lg text-sm"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={isPending}
                placeholder="Title of collection ..."
                aria-invalid={isInvalid}
                autoComplete="off"
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      />

      <FieldSeparator />

      <div>
        <Button className="w-full" type="submit">
          {isPending ? (
            <>
              <Spinner /> {pendingButtonLabel}
            </>
          ) : (
            buttonLabel
          )}
        </Button>
      </div>
    </form>
  );
}
