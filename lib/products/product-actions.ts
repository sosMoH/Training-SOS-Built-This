"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { productSchema } from "./products-validations";
import { db } from "@/db";
import { products } from "@/db/schema";
import z from "zod";

type FormState = {
  errors?: Record<string, string[]>;
  success: boolean;
  message: string;
};

export const addProductAction = async (
  prevState: FormState,
  formData: FormData,
) => {
  console.log(`FormData: ${formData}`);

  // Auth Check ///////////////////////////////////
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "You must be Signed In to Submit",
      };
    }

    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress || "anonymous";

    // Extract Data ///////////////////////////////
    const rawFormData = Object.fromEntries(formData.entries());

    // Validate Data //////////////////////////////
    const validatedDate = productSchema.safeParse(rawFormData);

    if (!validatedDate.success) {
      return {
        errors: validatedDate.error.flatten().fieldErrors,
        success: false,
        message: "Invalid Data",
      };
    }

    // Transform Data //////////////////////////////
    const { name, slug, tagline, description, websiteUrl, tags } =
      validatedDate.data;

    const tagsArray = tags ? tags.filter((tag) => typeof tag === "string") : [];

    await db.insert(products).values({
      name,
      slug,
      tagline,
      description,
      websiteUrl,
      tags: tagsArray,
      status: "pending",
      submittedBy: userEmail,
      userId: "",
      organizationId: "",
    });

    return {
      success: true,
      message: "Product Submitted Successfully! It will be reviewed shortly",
    };
  } catch (error) {
    console.log(error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
        message: "Validation failed. Please Check the form.",
      };
    }

    return {
      errors: error,
      success: false,
      message: `Failed to Submit Product, Error: ${error}`,
    };
  }
};
