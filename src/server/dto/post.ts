import { z } from "zod";

export const createInput = z.object({
  title: z
    .string()
    .min(1, "title must be at least 1 letter")
    .max(50, "title must be 50 letters or less"),
  body: z
    .string()
    .min(1, "body must be at least 1 letter")
    .max(20000, "body must be 2000 letters or less"),
});

export const updateInput = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, "title must be at least 1 letter")
    .max(50, "title must be 50 letters or less"),
  body: z
    .string()
    .min(1, "body must be at least 1 letter")
    .max(20000, "body must be 2000 letters or less"),
});

export const toggleInput = z.object({
  id: z.string(),
  is_publish: z.boolean(),
});