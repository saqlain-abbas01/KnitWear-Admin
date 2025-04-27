import { z } from "zod";

export const formSchema = z.object({
  label: z.string().min(2, {
    message: "Brand name must be at least 2 characters.",
  }),
  value: z
    .string()
    .min(2, {
      message: "Brand slug must be at least 2 characters.",
    })
    .regex(/^[a-z0-9-]+$/, {
      message:
        "Brand slug can only contain lowercase letters, numbers, and hyphens.",
    }),
});
