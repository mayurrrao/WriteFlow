import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const AppBar2 = () => {
    const navigate = useNavigate();

    return (
        <motion.nav
            className="w-full bg-[#172130] text-white shadow-lg fixed top-0 z-50 backdrop-blur-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
                <div className="flex items-center h-16">
                    <button onClick={() => navigate(-1)} className="text-indigo-200 hover:text-indigo-300 transition duration-300 flex items-center text-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};