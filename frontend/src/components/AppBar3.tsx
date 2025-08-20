import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const AppBar3 = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Function to scroll to top smoothly
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <motion.nav
            className={`w-full fixed top-0 z-50 flex items-center justify-between px-3 py-3 transition-all duration-300
                ${isScrolled ? "bg-white/90 backdrop-blur-lg shadow-sm" : "bg-transparent"}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Logo and Branding */}
            <div className="flex items-center cursor-pointer" onClick={scrollToTop}>
                <img
                    src="/logo.jpg"
                    alt="Logo"
                    className="w-10 h-10 object-contain logo-transparent"
                />
                <span
                    className={`text-xl font-bold tracking-wide ${isScrolled ? "text-gray-900" : "text-gray-900"
                        } transition-all duration-300`}
                >
                    WriteFlow
                </span>
            </div>

            {/* Dynamic Button */}
            <Link
                to={isScrolled ? "/signup" : "/signin"}
                className={`px-5 py-2 text-sm font-medium rounded-md transition-all duration-300 ${isScrolled
                    ? "bg-gray-900 hover:bg-gray-800 text-white"
                    : "text-gray-900 text-lg hover:text-gray-700 border border-gray-900 hover:bg-gray-900 hover:text-white"
                    }`}
            >
                {isScrolled ? <span>SIGN <span className="font-normal">UP</span></span> : <span>SIGN <span className="font-normal">IN</span></span>}
            </Link>
        </motion.nav>
    );
};
