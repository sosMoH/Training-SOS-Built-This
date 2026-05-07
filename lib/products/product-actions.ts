"use server";

import { auth, currentUser, clerkClient } from "@clerk/nextjs/server";
import { productSchema } from "./products-validations";
import { db } from "@/db";
import { products } from "@/db/schema";
import z from "zod";
import { FormState } from "@/types";


export const addProductAction = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  console.log(`FormData: ${formData}`);

  // Auth Check ///////////////////////////////////
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "You must be Signed In to Submit a Product",
      };
    }

    // Flexible variable to hold Org ID
    let activeOrgId = orgId;

    if (!activeOrgId) {
      const client = await clerkClient();
      const { data: memberships } =
        await client.users.getOrganizationMembershipList({
          userId: userId,
        });

      if (memberships && memberships.length > 0) {
        // Grab the ID of the organization the middleware just created
        activeOrgId = memberships[0].organization.id;
      } else {
        return {
          success: false,
          message:
            "You must be a member of an Organization to Submit a Product",
        };
      }
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
      userId,
      organizationId: activeOrgId,
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
