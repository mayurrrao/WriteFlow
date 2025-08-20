import axios from "axios";
import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { BACKEND_URL } from "../config";
import { useBlogs } from "../Hooks";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isPublishing, setIsPublishing] = useState(false);
    const navigate = useNavigate();
    const { loading } = useBlogs();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Redirect to login if user is not logged in
    useEffect(() => {
        if (!localStorage.getItem("token")) navigate("/");
    }, [navigate]);

    // Automatically remove error message after 3 seconds
    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => setErrorMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white text-gray-900 flex flex-col">
                <AppBar />
                <div className="flex flex-grow justify-center items-center">
                    <LoadingSpinner />
                </div>
            </div>
        );
    }

    const handlePublish = async () => {
        if (!title || !content) {
            setErrorMessage("Title and content are required to publish the post.");
            return;
        }
        if (title.length < 10) {
            setErrorMessage("Title must be at least 10 characters long.");
            return;
        }
        if (content.length < 24) {
            setErrorMessage("Content must be at least 24 characters long.");
            return;
        }
        setIsPublishing(true);
        try {
            const res = await axios.post(
                `${BACKEND_URL}/api/v1/blog/create`,
                { title, content },
                { headers: { Authorization: localStorage.getItem("token") } }
            );
            navigate(`/blog/${res.data.id}`);
        } catch (e) {
            console.error("Error creating blog post:", e);
            alert("Failed to publish the post. Please try again.");
        } finally {
            setIsPublishing(false);
        }
    }

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <AppBar />
            <div className="flex justify-center pt-20 lg:pt-24 px-4">
                {/* Main container */}
                <div className="w-full max-w-3xl space-y-6 p-4 sm:p-5 lg:p-7 bg-white rounded-xl border border-gray-200 shadow-sm">
                    {/* Inner card with sliding effect */}
                    <motion.div
                        initial={{ x: -60, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 90, damping: 20 }}
                        className="w-full max-w-3xl bg-white backdrop-blur-md p-5 sm:p-8 rounded-xl shadow-sm border border-gray-200"
                    >
                        {/* Page heading and description */}
                        <div className="mb-7 mt-1 text-center">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Publish Blog</h1>
                            <p className="text-xs md:text-sm text-gray-600 mt-1">
                                Share your insights, news, or stories with our community.
                            </p>
                        </div>

                        {/* Error message */}
                        <AnimatePresence>
                            {errorMessage && (
                                <motion.div
                                    key="errorMessage"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-red-600 text-white text-sm p-3 rounded-lg mb-4"
                                >
                                    {errorMessage}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Title input */}
                        <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter blog title..."
                            className="w-full p-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent placeholder-gray-500"
                        />

                        {/* Content editor */}
                        <TextEditor onChange={(e) => setContent(e.target.value)} />

                        {/* Publish button */}
                        <button
                            onClick={handlePublish}
                            disabled={isPublishing}
                            className={`mt-4 w-full py-3 font-semibold rounded-lg shadow-md transition-all duration-300 focus:ring-2 focus:ring-gray-500 flex items-center justify-center space-x-2 
                                ${isPublishing ? "bg-gray-600 hover:bg-gray-600 cursor-not-allowed text-white" : "bg-gray-900 hover:bg-gray-800 text-white"}`}>
                            {isPublishing ? (
                                <>
                                    <svg className="animate-spin size-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 16 0h-2a6 6 0 1 0-12 0H4z"
                                        ></path>
                                    </svg>
                                    <span>Publishing...</span>
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l18-9-9 18-2.5-6.5L3 12z"
                                        />
                                    </svg>
                                    <span>Publish</span>
                                </>
                            )}
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

// TextEditor component for content input
function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div className="mt-4">
            <textarea onChange={onChange} rows={8} placeholder="Write an article..." required
                className="w-full p-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent placeholder-gray-500 resize-none"
            />
        </div>
    );
}
