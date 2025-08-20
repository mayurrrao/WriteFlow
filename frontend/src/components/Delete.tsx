import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar } from "./AppBar";
import { motion } from "framer-motion";
import { useDeleteUser } from "../Hooks";

export const DeleteAccount = () => {
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const { deleteUser, loading, error, success } = useDeleteUser();
    const navigate = useNavigate();

    // Redirect to login if user is not logged in
    useEffect(() => {
        if (!localStorage.getItem("token")) navigate("/");
    }, [navigate]);

    // Show success message and redirect after deletion
    useEffect(() => {
        if (success) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
                navigate("/signup");
            }, 2000);
        }
    }, [success, navigate]);

    const handleDelete = async () => {
        setShowConfirmDelete(false);
        await deleteUser();
    };

    return (
        <div className="bg-[#0f172a] min-h-screen text-gray-200 relative">
            <AppBar />
            <div className="flex justify-center pt-20 lg:pt-24 px-4">
                <div className="w-full max-w-6xl space-y-6 p-4 sm:p-5 lg:p-7 bg-[#15203a] rounded-xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="grid md:grid-cols-12 gap-6 p-5 lg:p-7 w-full rounded-xl bg-[#23324a] border border-[#2e3978] backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ x: -60 }}
                            animate={{ x: 0 }}
                            transition={{ type: "spring", stiffness: 90, damping: 20 }}
                            className="md:col-span-12"
                        >
                            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-100  max-w-6xl">
                                Are you sure you want to delete your account? 
                            </h1>
                            <p className="mt-4 text-gray-300 leading-relaxed text-base max-w-6xl">
                                Deleting your account is <strong>permanent</strong> and <strong>cannot be undone</strong>.
                                You will lose all your data and access to your profile.
                            </p>
                            {error && <p className="text-red-400 mt-2">{error}</p>}
                            <div className="mt-6 flex justify-start">
                                <button
                                    onClick={() => setShowConfirmDelete(true)}
                                    disabled={loading}
                                    className="px-4 py-2 md:px-5 md:py-2.5 bg-red-700 rounded-lg text-white hover:bg-red-800 focus:ring-2 focus:ring-red-500/50 disabled:opacity-60 flex items-center"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin size-5 mr-2" viewBox="0 0 24 24" fill="none">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 16 0h-2a6 6 0 1 0-12 0H4z"></path>
                                            </svg>
                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mr-2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                            Delete My Account
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-[#23324a] p-6 rounded-xl shadow-lg text-gray-200 w-80 text-center"
                    >
                        <p className="text-lg font-semibold mb-4">Confirm account deletion: Do you really want to proceed?</p>
                        <div className="flex justify-between">
                            <button onClick={() => setShowConfirmDelete(false)} className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg w-24">Cancel</button>
                            <button onClick={handleDelete} className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded-lg w-24">Delete</button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Success Message Modal */}
            {showSuccessMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-green-600 p-6 rounded-xl shadow-lg text-white w-80 text-center"
                    >
                        <p className="text-lg font-semibold">Account Deleted Successfully!</p>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default DeleteAccount;
