import z from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(120, { message: "Name must be at most 120 characters" }),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters" })
    .max(140, { message: "Slug must be at most 140 characters " })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message:
        "Slug must be lowercase & contain only letters, numbers & hyphens",
    }),
  tagline: z
    .string()
    .max(200, { message: "Tagline must be at most 200 characters" }),
  description: z.string().optional(),
  websiteUrl: z.string().min(1, { message: "URL is Required" }),
  tags: z
    .string()
    .min(1, { message: "Tags are Required" })
    .transform((val) => val.split(",").map((tag) => tag.trim().toLowerCase())),
});
