import z from "zod";

const createProjectValidation = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  images: z
    .array(z.string())
    .nonempty("At least one image is required").optional(),
  features: z
    .array(z.string().min(1, "Feature cannot be empty"))
    .nonempty("At least one feature is required"),
  tags: z
    .array(z.string().min(1, "Tag cannot be empty"))
    .nonempty("At least one tag is required"),
  category: z.string().min(2, "Category is required"),
  liveLink: z.string().optional(),
  clientRepo: z.string().optional(),
  serverRepo: z.string().optional(),
});

export const ProjectValidation = {
  createProjectValidation
}