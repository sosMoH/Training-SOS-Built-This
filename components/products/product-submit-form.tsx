"use client";

import { LoaderIcon, SparklesIcon } from "lucide-react";
import FormField from "../forms/form-field";
import { Button } from "../ui/button";
import { Field } from "../ui/field";
import { addProductAction } from "@/lib/products/product-actions";
import { useActionState } from "react";

const initialState = {
  error: {},
  success: false,
  message: "",
};

type FormState = {
  errors?: Record<string, string>;
  success: boolean;
  message: string;
};

export default function ProductSubmitForm() {
  const [state, formAction, isPending] = useActionState<FormState>(
    addProductAction,
    initialState,
  );

  console.log(state);

  return (
    <form className="space-y-6 pb-6" action={formAction}>
      <FormField
        id="name"
        label="Product Name"
        name="name"
        placeholder="My Awesome Project"
        required
        onChange={() => {}}
        error=""
      />
      <FormField
        id="slug"
        label="Slug"
        name="slug"
        placeholder="my-awesome-product"
        required
        onChange={() => {}}
        error=""
        helperText="URL-friendly version of your product name"
      />
      <FormField
        id="tagline"
        label="Tagline"
        name="tagline"
        placeholder="A brief, catchy description"
        required
        onChange={() => {}}
        error=""
      />
      <FormField
        id="description"
        label="Description"
        name="description"
        placeholder="Tell us more about your product..."
        required
        onChange={() => {}}
        error=""
        textarea
      />
      <FormField
        id="websiteUrl"
        label="Website URL"
        name="websiteUrl"
        placeholder="https://yourproduct.com"
        required
        onChange={() => {}}
        error=""
        helperText="Enter your product's website or landing page"
      />
      <FormField
        id="tags"
        label="Tags"
        name="tags"
        placeholder="Ai, SaaS, Productivity"
        required
        onChange={() => {}}
        error=""
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
