import { Blog, useBlogsHome } from "../Hooks";
import { BlogCard } from "./BlogCard";
import { useEffect, useRef } from "react";

export const BlogSlider = () => {
    const { loading, blogs } = useBlogsHome();
    const sliderRef = useRef<HTMLDivElement | null>(null);

    // Sort blogs by likes-dislikes, then by newest
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

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        let scrollAmount = 0;
        const speed = 1.2; // Adjust speed for smoother scrolling

        const scroll = () => {
            if (!slider) return;
            if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
                scrollAmount = 0;
                slider.scrollTo({ left: 0, behavior: "instant" });
            } else {
                scrollAmount += speed;
                slider.scrollLeft += speed;
            }
            requestAnimationFrame(scroll);
        };

        const animation = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(animation);
    }, []);

    return (
        <section className="relative overflow-hidden py-9 medium-bg">
            {/* Featured Blogs Header */}
            <div className="text-center">
                <h1 className="text-3xl font-semibold text-gray-900 group inline-block cursor-auto">
                    <span className="text-gray-900">
                        Featured Blogs
                        {/* Animated Underline */}
                        <div className="mx-auto mt-3 h-[3px] w-16 bg-green-600 rounded-full transition-all duration-300 ease-in-out group-hover:w-40 group-hover:block"></div>
                    </span>
                </h1>
            </div>

            {/* Blog Slider */}
            <div ref={sliderRef} className="flex space-x-6  overflow-x-auto no-scrollbar px-6 py-8">
                {loading ? (
                    <p className="text-gray-600 mx-auto">Loading blogs...</p>
                ) : (
                    <>
                        {sortedBlogs.slice(0, 5).map((blog: Blog) => (
                            <div key={blog.id} className="min-w-[320px] max-w-xs p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
                                <BlogCard
                                    id={blog.id}
                                    authorName={blog.author.name || "Anonymous"}
                                    title={blog.title}
                                    content={blog.content}
                                    publishedDate={""}
                                    likeCount={blog.likeCount}
                                    dislikeCount={blog.dislikeCount}
                                />
                            </div>
                        ))}

                        {/* Sign in / Sign up Card */}
                        <a
                            href="/signup"
                            className="min-w-[320px] max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col items-center justify-center text-gray-900 text-center transition hover:shadow-md"
                        >
                            <p className="text-lg font-semibold">Sign in or Sign up</p>
                            <p className="text-gray-600 text-sm mt-1">to explore more blogs</p>
                        </a>
                    </>
                )}
            </div>
            {/* Explore More Button */}
            <div className="flex justify-center">
                <a
                    href="/signin"
                    className="px-6 py-3 text-lg font-medium text-white bg-gray-900 rounded-full shadow-sm transition hover:bg-gray-800 focus:bg-gray-800"
                >
                    Explore More
                </a>
            </div>

        </section>
    );
};
