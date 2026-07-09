import { z } from "zod";

export const messageSchema = z.object({
  authorName: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(50, "Name must be 50 characters or less"),
  body: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(300, "Message must be 300 characters or less"),
  website: z.string().max(0).optional(),
});

export const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export function sanitizeText(value: string): string {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/[<>]/g, "")
    .trim();
}
