import { z } from "zod";

export const signupInput = z.object({
    username: z.string().email({ message: "Invalid email format. Use (e.g., youremail@gmail.com)" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long " }),
    name: z.string().min(1, { message: "Name is required" })
})

export const signinInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
})

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})

export const blogUpdateInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
})

export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type createBlogInput = z.infer<typeof createBlogInput>
export type blogUpdateInput = z.infer<typeof blogUpdateInput>