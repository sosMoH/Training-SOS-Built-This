"use client";

import { LoaderIcon, SparklesIcon } from "lucide-react";
import FormField from "../forms/form-field";
import { Button } from "../ui/button";
import { Field } from "../ui/field";
import { addProductAction } from "@/lib/products/product-actions";
import { useActionState } from "react";
import { FormState } from "@/types";
import { cn } from "@/lib/utils";

const initialState: FormState = {
  success: false,
  errors: undefined,
  message: "",
};

export default function ProductSubmitForm() {
  const [state, formAction, isPending] = useActionState(
    addProductAction,
    initialState,
  );

  console.log(state);

  const { errors, message, success } = state;
  const fieldErrors = (errors || {}) as Record<string, string[]>;

  return (
    <form className="space-y-6 pb-6" action={formAction}>
      {message && (
        <div
          className={cn(
            "p-4 rounded-lg border",
            success
              ? "bg-primary/10 border-primary text-primary"
              : "bg-destructive/10 border-destructive text-destructive",
          )}
          role="alert"
          aria-live="polite"
        >
          {message}
        </div>
      )}
      <FormField
        id="name"
        label="Product Name"
        name="name"
        placeholder="My Awesome Project"
        required
        onChange={() => {}}
        error={fieldErrors.name ?? []}
      />
      <FormField
        id="slug"
        label="Slug"
        name="slug"
        placeholder="my-awesome-product"
        required
        onChange={() => {}}
        error={fieldErrors.slug ?? []}
        helperText="URL-friendly version of your product name"
      />
      <FormField
        id="tagline"
        label="Tagline"
        name="tagline"
        placeholder="A brief, catchy description"
        required
        onChange={() => {}}
        error={fieldErrors.tagline ?? []}
      />
      <FormField
        id="description"
        label="Description"
        name="description"
        placeholder="Tell us more about your product..."
        required
        onChange={() => {}}
        error={fieldErrors.description ?? []}
        textarea
      />
      <FormField
        id="websiteUrl"
        label="Website URL"
        name="websiteUrl"
        placeholder="https://yourproduct.com"
        required
        onChange={() => {}}
        error={fieldErrors.websiteUrl ?? []}
        helperText="Enter your product's website or landing page"
      />
      <FormField
        id="tags"
        label="Tags"
        name="tags"
        placeholder="Ai, SaaS, Productivity"
        required
        onChange={() => {}}
        error={fieldErrors.tags ?? []}
        helperText="Comma-separated tags (e.g., AI, SaaS, Productivity)"
      />
      <Button type="submit" size="lg" className="w-full">
        {isPending ? (
          <LoaderIcon className="size-4 animate-spin" />
        ) : (
          <>
            <SparklesIcon className="size-4" />
            Submit Product
          </>
        )}
      </Button>
    </form>
  );
}
