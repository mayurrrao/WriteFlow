import { Hono } from "hono";
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { PrismaClient } from "@prisma/client/edge";
import { signinInput, signupInput } from "@mayurrrao/medium-common-zod";
import { verify } from 'hono/jwt';
import bcrypt from "bcryptjs";

export const userRoutes = new Hono<{ Bindings: { JWT_PASS: string, DATABASE_URL: string } }>();


// Signup route - Handles new user registration
userRoutes.post('/signup', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    const body = await c.req.json();

    // Validate request body using Zod schema
    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ message: "Invalid credentials" });
    }

    try {
        // Check if the username already exists
        const existingUser = await prisma.user.findUnique({ where: { username: body.username } });
        if (existingUser) {
            c.status(409);
            return c.json({ message: "Username already exists" });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(body.password, 10);

        // Create new user entry in the database
        const user = await prisma.user.create({
            data: { name: body.name, username: body.username, password: hashedPassword }
        });

        // Generate JWT token for authentication
        const token = await sign({ id: user.id }, c.env.JWT_PASS);
        return c.json({ jwt: token });
    } catch (e) {
        console.error(e);
        c.status(500);
        return c.json({ message: "Sign-up failed, please try again" });
    }
});

// Signin route - Authenticates existing users
userRoutes.post('/signin', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env?.DATABASE_URL }).$extends(withAccelerate());
    const body = await c.req.json();

    // Validate request body
    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ message: "Invalid credentials" });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { username: body.username } });
    if (!user) {
        c.status(403);
        return c.json({ error: "User not found" });
    }

    // Verify password
    const isPassValid = await bcrypt.compare(body.password, user.password);
    if (!isPassValid) {
        c.status(403);
        return c.json({ message: 'Invalid password' });
    }

    // Generate JWT token for the user
    const jwt = await sign({ id: user.id }, c.env.JWT_PASS);
    return c.json({ jwt });
});

// Logout route - Invalidates the user's session
userRoutes.post('/logout', async (c) => {
    const authHeader = c.req.header('Authorization');

    // Check if Authorization header exists
    if (authHeader) {
        return c.json({ message: 'Logged out successfully' });
    } else {
        c.status(403);
        return c.json({ message: 'JWT authentication failed' });
    }
});

// New endpoint to fetch user details
userRoutes.get('/profile', async (c) => {
    const authHeader = c.req.header("authorization") || "";
    try {
        // Verify the JWT token from the Authorization header
        const userData = await verify(authHeader, c.env.JWT_PASS) as { id: string };
        if (!userData) {
            c.status(403);
            return c.json({ message: "Unauthorized" });
        }

        const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

        // Query the database for the user by id
        const user = await prisma.user.findUnique({ where: { id: userData.id } });
        if (!user) {
            c.status(404);
            return c.json({ message: "User not found" });
        }

        // Return the user's details (modify as needed if you store an email)
        return c.json({ user: { name: user.name, username: user.username } });
    } catch (e) {
        c.status(403);
        return c.json({ message: "Authorization failed" });
    }
});


// Update user 
userRoutes.put('/setting', async (c) => {
    const authHeader = c.req.header("authorization") || "";
    try {
        const userData = await verify(authHeader, c.env.JWT_PASS) as { id: string };
        if (!userData) {
            c.status(403);
            return c.json({ message: "Unauthorized" });
        }

        const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
        const body = await c.req.json();

        // Validate required fields
        const { success } = signupInput.safeParse(body);
        if (!success) {
            c.status(411);
            return c.json({ message: "Invalid credentials" });
        }

        // Check if the username already exists (for a different user)
        const existingUser = await prisma.user.findUnique({
            where: { username: body.username },
        });
        if (existingUser && existingUser.id !== userData.id) {
            c.status(400);
            return c.json({ message: "Username already exists" });
        }

        const updateData: any = {};
        if (body.name) updateData.name = body.name;
        if (body.username) updateData.username = body.username;
        if (body.password) updateData.password = await bcrypt.hash(body.password, 10);

        const updatedUser = await prisma.user.update({
            where: { id: userData.id },
            data: updateData,
        });

        return c.json({
            message: "Settings updated successfully",
            user: { name: updatedUser.name, username: updatedUser.username }
        });
    } catch (e) {
        console.error(e);
        c.status(500);
        return c.json({ message: "Failed to update settings" });
    }
});

// Delete user route 
userRoutes.delete('/delete', async (c) => {
    const authHeader = c.req.header("authorization") || "";
    try {
        const userData = await verify(authHeader, c.env.JWT_PASS) as { id: string };
        if (!userData) {
            c.status(403);
            return c.json({ message: "Unauthorized" });
        }
        
        const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

        // check if the user exists before attempting deletion
        const user = await prisma.user.findUnique({ where: { id: userData.id } });
        if (!user) {
            c.status(404);
            return c.json({ message: "User not found" });
        }
        
        // Delete the user record from the database
        await prisma.user.delete({ where: { id: userData.id } });
        return c.json({ message: "User deleted successfully" });
    } catch (e) {
        console.error(e);
        c.status(500);
        return c.json({ message: "Failed to delete user" });
    }
});
