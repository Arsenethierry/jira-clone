import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Required"),
});

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Required"),
    username: z.string().min(1, "Required"),
});