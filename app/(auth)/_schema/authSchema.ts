import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(4, "Name must be at least 4 characters")
    .max(50, "Name cannot exceed 50 characters"),

  email: z.string().trim().email("Please enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password cannot exceed 100 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Must contain at least one special character",
    ),

  phone: z
    .string()
    .trim()
    .regex(
      /^(\+8801|01)[3-9]\d{8}$/,
      "Please enter a valid Bangladeshi phone number",
    ),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address cannot exceed 200 characters"),

  role: z.enum(["Customer", "Provider"], {
    message: "Please select a role",
  }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
