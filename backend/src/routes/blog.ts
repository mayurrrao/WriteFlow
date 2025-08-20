import { Hono } from "hono";
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import { PrismaClient } from "@prisma/client/edge";
import { createBlogInput } from "@mayurrrao/medium-common-zod";

// Create Hono app instance with custom typings for environment variables and userId in context
export const blogRoutes = new Hono<{ Bindings: { JWT_PASS: string, DATABASE_URL: string }, Variables: { userId: string } }>();

// Route to fetch all blogs in bulk (public route - before auth middleware)
blogRoutes.get('/bulk', async (c) => {
    console.log("Bulk route hit!");
    const prisma = new PrismaClient({ 
        datasourceUrl: c.env.DATABASE_URL 
    }).$extends(withAccelerate());

    try {
        // Fetch a list of blogs with associated likes and dislikes counts
        const blogs = await prisma.blog.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                publishedDate: true,
                author: { select: { name: true } },
                _count: {
                    select: {
                        likes: true,
                        dislikes: true
                    }
                }
            }
        });

        // Transform the data to include likeCount and dislikeCount
        const blogsWithCounts = blogs.map(blog => ({
            ...blog,
            likeCount: blog._count.likes,
            dislikeCount: blog._count.dislikes,
            _count: undefined // Remove the _count field from response
        }));

        console.log(`Successfully fetched ${blogsWithCounts.length} blogs`);
        return c.json(blogsWithCounts);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        c.status(500);
        return c.json({ message: "Error while fetching blog posts" });
    }
});

// Middleware for verifying JWT token (applies to routes below this point)
blogRoutes.use("/*", async (c, next) => {
    console.log("Auth middleware - Request path:", c.req.path);
    
    const authHeader = c.req.header("authorization") || "";
    try {
        // Verify JWT and set userId in context
        const user = await verify(authHeader, c.env.JWT_PASS) as { id: string };
        if (user) {
            c.set("userId", user.id);
            await next();
        } else {
            c.status(403);
            return c.json({ message: "Jwt authentication failed" });
        }
    } catch (e) {
        c.status(403);
        return c.json({ message: "Authorization failed" });
    }
});

// Route to create a blog
blogRoutes.post('/create', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    const body = await c.req.json();

    // Validate the blog input using Zod
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ message: "Invalid credentials" });
    }

    const authorId = c.get("userId");
    try {
        // Create a new blog post
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId
            }
        });
        return c.json({ id: blog.id });
    } catch (e) {
        console.error("Error creating blog post: ", e);
        c.status(500);
        return c.json({ message: "Error creating blog post" });
    }
});

// Route to fetch a single blog by ID
blogRoutes.get('/:id', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    const blogId = c.req.param('id');
    const userId = c.get("userId");

    try {
        // Fetch blog along with likes and dislikes
        const blog = await prisma.blog.findUnique({
            where: { id: blogId },
            include: {
                author: true,
                likes: { select: { id: true } },  // Get list of users who liked the blog
                dislikes: { select: { id: true } } // Get list of users who disliked the blog
            }
        });

        if (!blog) {
            c.status(404);
            return c.json({ message: "Blog not found" });
        }

        // Determine like/dislike status for the current user
        const isLiked = blog.likes.some(user => user.id === userId);
        const isDisliked = blog.dislikes.some(user => user.id === userId);

        // Return blog details, like/dislike status, and counts
        return c.json({
            blog,
            isLiked,
            isDisliked,
            likeCount: blog.likes.length,
            dislikeCount: blog.dislikes.length
        });

    } catch (e) {
        console.error("Error fetching blog:", e);
        c.status(500);
        return c.json({ message: "Error fetching blog" });
    }
});

// Route to update an existing blog
blogRoutes.put('/update/:id', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    const blogId = c.req.param('id');
    const body = await c.req.json();
    const userId = c.get("userId");

    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ message: "Invalid input format" });
    }

    try {
        const existingBlog = await prisma.blog.findUnique({ where: { id: blogId } });
        if (!existingBlog) {
            c.status(404);
            return c.json({ message: "Blog not found" });
        }

        // Check if the current user is the author of the blog
        if (existingBlog.authorId !== userId) {
            c.status(403);
            return c.json({ message: "You do not have permissions to update this blog" });
        }

        // Update the blog
        const updatedBlog = await prisma.blog.update({
            where: { id: blogId },
            data: { title: body.title, content: body.content }
        });
        return c.json({ message: "Blog updated successfully!", blog: updatedBlog });
    } catch (e) {
        console.error("Error updating blog:", e);
        c.status(500);
        return c.json({ message: "Failed to update the blog" });
    }
});

// Route to delete a blog
blogRoutes.delete('/delete/:id', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    const blogId = c.req.param('id');
    const userId = c.get("userId");

    try {
        const existingBlog = await prisma.blog.findUnique({ where: { id: blogId } });
        if (!existingBlog) {
            c.status(404);
            return c.json({ message: "Blog not found" });
        }

        // Check if the current user is the author of the blog
        if (existingBlog.authorId !== userId) {
            c.status(403);
            return c.json({ message: "You do not have permissions to delete this blog" });
        }

        // Delete the blog
        const deletedPost = await prisma.blog.delete({ where: { id: blogId } });
        return c.json({ message: `Post with ID ${blogId} deleted successfully`, post: deletedPost });
    } catch (e) {
        console.error("Error deleting blog:", e);
        c.status(500);
        return c.json({ message: "Failed to delete the blog" });
    }
});

// Route to like a blog
blogRoutes.put('/like/:id', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    const blogId = c.req.param('id');
    const userId = c.get("userId");

    try {
        const blog = await prisma.blog.findUnique({
            where: { id: blogId },
            include: { likes: true, dislikes: true }
        });

        if (!blog) {
            c.status(404);
            return c.json({ message: "Blog not found" });
        }

        // Remove from dislikes if present
        await prisma.blog.update({
            where: { id: blogId },
            data: { dislikes: { disconnect: { id: userId } } }
        });

        // Toggle like status
        const isLiked = blog.likes.some(user => user.id === userId);
        if (isLiked) {
            await prisma.blog.update({
                where: { id: blogId },
                data: { likes: { disconnect: { id: userId } } }
            });
            return c.json({ message: "Like removed" });
        } else {
            await prisma.blog.update({
                where: { id: blogId },
                data: { likes: { connect: { id: userId } } }
            });
            return c.json({ message: "Blog liked" });
        }

    } catch (e) {
        console.error("Error liking blog:", e);
        c.status(500);
        return c.json({ message: "Error liking blog" });
    }
});

// Route to dislike a blog
blogRoutes.put('/dislike/:id', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    const blogId = c.req.param('id');
    const userId = c.get("userId");

    try {
        const blog = await prisma.blog.findUnique({
            where: { id: blogId },
            include: { likes: true, dislikes: true }
        });

        if (!blog) {
            c.status(404);
            return c.json({ message: "Blog not found" });
        }

        // Remove from likes if present
        await prisma.blog.update({
            where: { id: blogId },
            data: { likes: { disconnect: { id: userId } } }
        });

        // Toggle dislike status
        const isDisliked = blog.dislikes.some(user => user.id === userId);
        if (isDisliked) {
            await prisma.blog.update({
                where: { id: blogId },
                data: { dislikes: { disconnect: { id: userId } } }
            });
            return c.json({ message: "Dislike removed" });
        } else {
            await prisma.blog.update({
                where: { id: blogId },
                data: { dislikes: { connect: { id: userId } } }
            });
            return c.json({ message: "Blog disliked" });
        }

    } catch (e) {
        console.error("Error disliking blog:", e);
        c.status(500);
        return c.json({ message: "Error disliking blog" });
    }
});