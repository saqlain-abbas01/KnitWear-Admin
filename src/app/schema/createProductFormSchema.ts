import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z
    .number()
    .min(1, "Price must be at least 1")
    .max(10000, "Price must be at most 10000"),
  discountPercentage: z
    .number()
    .min(1, "Discount must be at least 1%")
    .max(99, "Discount must be at most 99%")
    .optional(),
  stock: z.number().min(0, "Stock cannot be negative").optional(),
  size: z.enum(["xs", "s", "m", "l", "xl"], {
    required_error: "Size is required",
    invalid_type_error: "Invalid size",
  }),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().min(1, "Subcategory is required"),
  images: z.array(z.string()).min(1, "At least one image is required"),
});
