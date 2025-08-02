import z from "zod";
import { IsActive, UserRole } from "./user.interface";

export const createUserZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name can't exceed 50 characters" }),

  email: z.string().email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),

  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long" })
    .optional(),

  phone: z
    .string()
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh (e.g., +8801XXXXXXXXX or 01XXXXXXXXX)",
    })
    .optional(),
});

export const updateUserZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name can't exceed 50 characters" })
    .optional(),

  email: z.string().email({ message: "Invalid email address" }).optional(),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    })
    .optional(),

  role: z.enum(Object.values(UserRole) as [string]).optional(),

  isActive: z.enum(Object.values(IsActive) as [string]).optional(),

  isDeleted: z.boolean().optional(),

  isVerified: z.boolean().optional(),

  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long" })
    .optional(),

  phone: z
    .string()
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh (e.g., +8801XXXXXXXXX or 01XXXXXXXXX)",
    })
    .optional(),
});
