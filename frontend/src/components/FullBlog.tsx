import { Link } from "react-router-dom";
import { Blog, useDate } from "../Hooks";
import { AppBar } from "./AppBar";
import { Avatar } from "./BlogCard";
import { motion } from 'framer-motion';
import { useLikeDislike } from "../Hooks";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
    id: string;
}

export const FullBlog = ({ blog }: { blog: Blog }) => {

    const { dates } = useDate();
    const publishedDate = dates[blog.id] || "...";
    const { isLiked, isDisliked, toggleLike, toggleDislike, isLoading, isProcessingLike, isProcessingDislike } = useLikeDislike(blog.id);
    const isButtonDisabled = isLoading || isProcessingLike || isProcessingDislike;

    // Retrieve and decode the token to get the current user's id
    const token = localStorage.getItem("token");
    let currentUserId = "";
    if (token) {
        try {
            const decoded = jwtDecode<TokenPayload>(token);
            currentUserId = decoded.id; // Adjust this based on your JWT payload structure
        } catch (error) {
            console.error("Failed to decode token:", error);
        }
    }
    // Check if the current user is the blog's owner
    const isOwner = currentUserId === blog.author.id;

    return (
        <div className="bg-white min-h-screen text-gray-800">
            <AppBar />
            <div className="flex justify-center pt-20 pb-20 lg:pt-24 lg:pb-24 px-4">
                <div className="w-full max-w-6xl space-y-6 p-4 sm:p-5 lg:p-7 bg-white rounded-xl border border-gray-200 shadow-sm">
                    {/* Main Blog Wrapper */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="grid md:grid-cols-12 gap-6 p-5 lg:p-7 w-full max-w-6xl rounded-xl bg-white border border-gray-200 shadow-sm"
                    >
                        {/* Blog Content Section */}
                        <motion.div
                            initial={{ x: -60 }}
                            animate={{ x: 0 }}
                            transition={{ type: "spring", stiffness: 90, damping: 20 }}
                            className="md:col-span-9 overflow-hidden"
                        >
                            <h1 className="text-2xl md:text-4xl font-extrabold break-words text-gray-900">{blog.title}</h1>
                            <p className="text-gray-600 py-2 text-sm">Posted on {publishedDate}</p>

                            <p className="mt-4 text-gray-700 leading-relaxed text-base max-w-4xl whitespace-pre-wrap break-words">{blog.content}</p>
                        </motion.div>

                        {/* Author Section */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="md:col-span-3"
                        >
                            <h2 className="text-gray-600 font-semibold text-base">Author</h2>
                            <div className="flex items-center mt-2">
                                <Avatar size="small" name={blog.author.name} />
                                <span className="text-base font-bold pl-2 text-gray-900">{blog.author.name}</span>
                            </div>
                        </motion.div>

                        {/* Like/Dislike and Edit Section */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="col-span-full flex flex-col sm:flex-row justify-between items-center mt-7 space-y-4 sm:space-y-0 sm:space-x-4"
                        >
                            {/* Like/Dislike Buttons */}
                            <div className="flex space-x-4 w-full sm:w-auto justify-center sm:justify-start">
                                <button onClick={toggleLike} disabled={isButtonDisabled}
                                    className={`w-full sm:w-auto bg-gray-900 ${isProcessingLike ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"} text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition-all duration-300 focus:ring-2 focus:ring-gray-400 flex items-center justify-center`}
                                >
                                    {isProcessingLike ? (
                                        <svg className="animate-spin size-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 16 0h-2a6 6 0 1 0-12 0H4z"></path>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-5 ${isLiked ? "fill-green-500 stroke-green-500" : "fill-none"}`}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                        </svg>
                                    )}
                                    <div className="pl-1">{isLiked ? "Liked" : "Like"}</div>
                                </button>
                                <button onClick={toggleDislike} disabled={isButtonDisabled}
                                    className={`w-full sm:w-auto bg-gray-900 ${isProcessingDislike ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"} text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition-all duration-300 focus:ring-2 focus:ring-gray-400 flex items-center justify-center`}
                                >
                                    {isProcessingDislike ? (
                                        <svg className="animate-spin size-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 16 0h-2a6 6 0 1 0-12 0H4z"></path>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-5 ${isDisliked ? "fill-red-500 stroke-red-500" : "fill-none"}`}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
                                        </svg>
                                    )}
                                    <div className="pl-1">{isDisliked ? "Disliked" : "Dislike"}</div>
                                </button>
                            </div>

                            {/* Edit Button with error message on click for non-owner */}
                            {isOwner && (
                                <Link to={`/edit/${blog.id}`} className="w-full sm:w-auto">
                                    <motion.button
                                        className="w-full bg-indigo-800 hover:bg-indigo-900 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all duration-300 focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
                                    >
                                        Edit Blog
                                    </motion.button>
                                </Link>
                            )}
                            
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
