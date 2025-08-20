import { Link, useNavigate } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../Hooks";
import { useEffect } from "react";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    const navigate = useNavigate();

    // Redirect to login if user is not logged in
    useEffect(() => {
        if (!localStorage.getItem("token")) navigate("/");
    }, [navigate]);

    // Show skeleton loaders while blogs are loading
    if (loading) {
        return (
            <div className="bg-white min-h-screen text-gray-800">
                <AppBar />
                <div className="flex justify-center pt-20 px-4 sm:px-6 lg:px-8">
                                        <div className="w-full max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
                        {loading && <BlogSkeleton />}
                        {loading && <BlogSkeleton />}
                        {loading && <BlogSkeleton />}
                    </div>
                </div>
            </div>
        );
    }
    //Sorting func. for blogs
    const sortedBlogs = [...blogs].sort((a, b) => {
        // Compare likes first (higher likes first)
        const likeDiff = b.likeCount - a.likeCount;
        if (likeDiff !== 0) {
            return likeDiff;
        }

        // If likes are the same, compare dislikes (lower dislikes first)
        const dislikeDiff = a.dislikeCount - b.dislikeCount;
        if (dislikeDiff !== 0) {
            return dislikeDiff;
        }

        // If both likes and dislikes are the same, sort by date (newer first)
        const dateA = new Date(a.publishedDate || a.createdAt);
        const dateB = new Date(b.publishedDate || b.createdAt);
        return dateB.getTime() - dateA.getTime();
    });

    return (
        <div className="bg-white min-h-screen text-gray-800">
            <AppBar />
            <div className="flex justify-center pt-20 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
                    {sortedBlogs.map(blog => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            authorName={blog.author.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={blog.publishedDate}
                            likeCount={blog.likeCount}
                            dislikeCount={blog.dislikeCount}
                        />
                    ))}
                </div>
            </div>

            {/* Footer Section */}
            <div className="flex justify-center items-center space-x-2 text-xs text-gray-600 py-6 opacity-80">
                <div className="pointer-events-none">
                    <span>Created by Mayur R Rao on Aug 15, 2025</span>
                </div>
                <Link to="/about">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-gray-600 transition duration-300 hover:scale-110 hover:text-gray-900">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                </Link>
            </div>
        </div>
    );
};
