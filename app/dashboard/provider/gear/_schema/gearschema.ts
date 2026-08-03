import { z } from "zod";

export const gearSchema = z.object({
  name: z.string().trim().min(3, "Gear name must be at least 3 characters"),

  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters"),

  brand: z.string().trim().min(2, "Brand is required"),

  category: z.enum(["cycling", "camping", "fitness", "sports", "water"]),

  availability: z.enum(["AVAILABLE", "UNAVAILABLE"]),

  stock: z.coerce.number().int().min(1, "Stock must be at least 1"),

  rentalPricePerDay: z.coerce.number().positive("Price must be greater than 0"),

  image: z.any().optional(),
});

export type GearInput = z.infer<typeof gearSchema>;
