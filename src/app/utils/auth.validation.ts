import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({ required_error: 'Name is required', invalid_type_error: 'Name should be a string' })
    .min(3, { message: 'Name should be at least 3 characters long' })
    .max(20, { message: 'Name should be less than 20 characters long' }),

  email:
    z.string({ required_error: 'Email is required', invalid_type_error: 'Email should be a string' })
      .email({ message: "Email is required" }),

  password: z.string({ required_error: 'Password is required', invalid_type_error: 'Password should be a string' })
    .min(8, { message: "Password should be at least 8 characters long" })
    .refine((data) => data.match(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/), {
      message: "Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),

  confirmPassword: z.string({ required_error: 'Confirm Password is required' })
    .min(8, { message: "Password should be at least 8 characters long" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string({ required_error: 'Email is required', invalid_type_error: 'Email should be a string' })
    .email({ message: "Email is required" }),

  password: z.string({ required_error: 'Password is required', invalid_type_error: 'Password should be a string' })
    .min(8, { message: "Password should be at least 8 characters long" })
    .refine((data) => data.match(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/), {
      message: "Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
});