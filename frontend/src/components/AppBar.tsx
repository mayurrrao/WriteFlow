import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Avatar } from "./BlogCard";
import { useUserProfile } from "../Hooks";

export const AppBar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { user } = useUserProfile();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    async function handleLogout() {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${BACKEND_URL}/api/v1/user/logout`, {
                method: "POST",
                headers: {
                    Authorization: `${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (res.ok) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
    };

    // Menu items used for both desktop and mobile
    const menuContent = (
        <>
            <motion.div whileHover={{ scale: 1.05 }} className="block rounded-md px-5 py-2 text-gray-700 hover:bg-gray-100">
                <Link to="/profile" className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-600 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    Profile
                </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="block rounded-md px-5 py-2 text-gray-700 hover:bg-gray-100">
                <Link to="/settings" className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-600 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    Settings
                </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="block rounded-md px-5 py-2 text-gray-700 hover:bg-gray-100">
                <Link to="/about" className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-600 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                    About
                </Link>
            </motion.div>
            <motion.button whileHover={{ scale: 1.05 }} onClick={handleLogout} className="w-full rounded-md text-left block px-5 py-2 text-gray-700 hover:bg-gray-100">
                <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2 text-gray-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                    </svg>
                    Sign out
                </div>
            </motion.button>
        </>
    );

    return (
        <>
            <motion.nav
                className={`w-full fixed top-0 z-50 backdrop-blur-lg transition-all duration-300 ${isScrolled ? "bg-white/95 shadow-sm text-gray-800" : "bg-transparent text-gray-800"
                    }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
                    <div className="flex justify-between items-center h-16">
                        {/* Circular logo */}
                        <div className="flex items-center">
                            <img src="/logo.jpg" alt="Logo" className="w-11 h-10 md:w-12 md:h-11 object-contain logo-transparent" />
                            <Link
                                to="/blogs"
                                className={`text-2xl font-extrabold tracking-wide transition duration-300 ${isScrolled
                                        ? "text-gray-900"
                                        : "text-gray-900"
                                    }`}
                            >
                                WriteFlow
                            </Link>

                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden sm:flex space-x-3 items-center">
                            <Link
                                to="/publish"
                                className="flex items-center bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 rounded-full shadow-sm transition duration-300 font-semibold"
                            >
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                                <span className="pl-1">Create Blog</span>
                            </Link>
                            <div className="relative">
                                <motion.button onClick={() => setAvatarMenuOpen(!avatarMenuOpen)} whileTap={{ scale: 0.95 }} className="border-2 border-gray-300 rounded-full">
                                    <div className="flex items-center justify-center relative w-10 h-10 overflow-hidden rounded-full">
                                        {user?.name ? (
                                            <Avatar name={user.name} size="big" />
                                        ) : (
                                            <img src="/logo.jpg" alt="Logo" className="w-10 h-10 object-cover rounded-full logo-transparent" />
                                        )}
                                    </div>
                                </motion.button>
                            </div>
                        </div>

                        {/* Mobile Menu Toggle (without Create Blog button) */}
                        <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden flex flex-col space-y-1 focus:outline-none border-2 border-gray-300 rounded-full">
                            <div className="flex items-center justify-center relative w-10 h-10 overflow-hidden rounded-full">
                                {user?.name ? (
                                    <Avatar name={user.name} size="big" />
                                ) : (
                                    <img src="/logo.jpg" alt="Logo" className="w-9 h-9 object-cover rounded-full logo-transparent" />
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Desktop Menu */}
            <AnimatePresence>
                {avatarMenuOpen && (
                    <motion.div
                        className="hidden sm:block fixed right-2 xl:right-12 2xl:right-40 top-16 mt-2 w-48 bg-white/95 backdrop-blur-lg rounded-md shadow-lg border border-gray-200 py-3 px-2 z-10"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.2 }}
                    >
                        {menuContent}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="sm:hidden fixed right-2 top-16 mt-2 w-48 bg-white/95 backdrop-blur-lg rounded-md shadow-lg border border-gray-200 py-3 px-3 z-[9999]"
                        variants={dropdownVariants}
                        initial="hidden" 
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.2 }}
                    >
                        {menuContent}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Action Button for Mobile: Only visible on small screens */}
            <motion.div
                className="fixed sm:hidden bottom-7 right-7 bg-gray-900 hover:bg-gray-800 text-white p-4 rounded-full shadow-lg z-[9999]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link to="/publish">
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </Link>
            </motion.div>
        </>
    );
};
