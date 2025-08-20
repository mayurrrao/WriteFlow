import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { BACKEND_URL } from "../config";
import { motion, AnimatePresence } from "framer-motion";

interface Blog {
    id: string;
    title?: string;
    content?: string;
}

export const Edit = ({ blog }: { blog: Blog }) => {
    const [title, setTitle] = useState(blog.title || "");
    const [content, setContent] = useState(blog.content || "");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const [isDelete, setIsDeleting] = useState(false);
    const { id } = blog;
    const navigate = useNavigate();

    // Handle error message fading effect
    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => setErrorMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    // Fetch blog details if not provided initially
    useEffect(() => {
        if (!blog.title || !blog.content) {
            const fetchBlog = async () => {
                try {
                    const { data } = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                        headers: { Authorization: localStorage.getItem("token") },
                    });
                    setTitle(data.title);
                    setContent(data.content);
                } catch (error) {
                    console.error("Error fetching blog details:", error);
                    setErrorMessage("Failed to fetch blog details.");
                }
            };
            fetchBlog();
        }
    }, [id, blog]);

    // Handle blog update
    const handleUpdate = async () => {
        setIsPublishing(true);
        try {
            await axios.put(`${BACKEND_URL}/api/v1/blog/update/${id}`, { title, content }, {
                headers: { Authorization: localStorage.getItem("token") },
            });
            navigate(`/blog/${id}`);
        } catch (error) {
            console.error("Error updating blog:", error);
            setErrorMessage("Access denied: You do not have permission to update this blog.");
        } finally {
            setIsPublishing(false);
        }
    };

    // Handle blog deletion
    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await axios.delete(`${BACKEND_URL}/api/v1/blog/delete/${id}`, {
                headers: { Authorization: localStorage.getItem("token") },
            });
            navigate("/blogs");
        } catch (error) {
            console.error("Error deleting blog:", error);
            setErrorMessage("Access denied: You do not have permission to delete this blog.");
        } finally {
            setIsDeleting(false)
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <AppBar />
            <div className="flex justify-center w-full pt-20 lg:pt-24 px-4">
                <div className="w-full max-w-3xl space-y-6 p-4 sm:p-5 lg:p-7 bg-[#15203a] rounded-xl">
                    {/* Inner card with sliding effect */}
                    <motion.div
                        initial={{ x: -60, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 90, damping: 20 }}
                        className="w-full max-w-screen-lg bg-[#23324a] p-5 rounded-xl shadow-lg backdrop-blur-md"
                    >
                        {/* Page heading and description */}
                        <div className="mb-7 mt-1 text-center">
                            <h1 className="text-2xl md:text-3xl font-bold">Edit Blog</h1>
                            <p className="text-xs md:text-sm text-gray-400 mt-1">
                                Update your title and content below.
                            </p>
                        </div>
                        {/* Error Message */}
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

                        {/* Title Input */}
                        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title"
                            className="bg-[#1e2b40] border border-[#2e3978] text-gray-300 rounded-lg w-full p-3 focus:outline-none"
                        />

                        {/* Content Input */}
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content"
                            className="border border-[#2e3978] rounded-lg focus:outline-none block w-full text-gray-300 bg-[#1e2b40] p-3 h-56 mt-4 resize-none"
                        />

                        {/* Action Buttons */}
                        <div className="flex space-x-4 w-full sm:w-auto justify-center sm:justify-start mt-5">
                            <button onClick={handleUpdate} className={`bg-indigo-700 hover:bg-indigo-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 w-full flex justify-center 
                            ${isPublishing ? "cursor-not-allowed opacity-70" : ""}`}>
                                {isPublishing ? (
                                    <>
                                        <svg className="animate-spin size-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 16 0h-2a6 6 0 1 0-12 0H4z"
                                            ></path>
                                        </svg>
                                        <span>Updating...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mr-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                        </svg>
                                        <span>Update</span>
                                    </>
                                )}
                            </button>

                            <button onClick={() => { setShowConfirmDelete(true) }} className={`bg-red-700 hover:bg-red-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md focus:ring-2 focus:ring-red-500 w-full flex justify-center
                            ${isDelete ? "cursor-not-allowed opacity-70" : ""}`}>
                                {isDelete ? (
                                    <>
                                        <svg className="animate-spin size-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 16 0h-2a6 6 0 1 0-12 0H4z"
                                            ></path>
                                        </svg>
                                        <span>Deleting...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mr-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                        <span>Delete</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Confirmation Modal for Deletion */}
            {showConfirmDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-[#23324a] p-6 rounded-xl shadow-lg text-gray-200 w-80">
                        <p className="text-lg font-semibold mb-4">Are you sure you want to delete this blog?</p>
                        <div className="flex justify-between">
                            <button onClick={() => setShowConfirmDelete(false)} className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg">Cancel</button>
                            <button onClick={() => { setShowConfirmDelete(false); handleDelete(); }} className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
