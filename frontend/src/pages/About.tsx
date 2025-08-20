import { motion } from "framer-motion";
import { AppBar2 } from "../components/AppBar2";

export const AboutUs = () => {
    return (
        <div className="bg-white min-h-screen text-gray-900">
            {/* AppBar for navigation */}
            <AppBar2 />

            <div className="flex justify-center pt-20 lg:pt-24 px-4">
                <div className="w-full max-w-6xl space-y-6 p-4 sm:p-5 lg:p-7 bg-white rounded-xl">
                    {/* Main Content Container with Animation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="grid md:grid-cols-12 gap-6 p-5 lg:p-7 w-full max-w-6xl rounded-xl bg-white border border-gray-200 backdrop-blur-md shadow-sm"
                    >
                        {/* Animated Content Section */}
                        <motion.div
                            initial={{ x: -60 }}
                            animate={{ x: 0 }}
                            transition={{ type: "spring", stiffness: 90, damping: 20 }}
                            className="md:col-span-12"
                        >
                            {/* Heading */}
                            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900">
                                Welcome to <span className="text-black font-extrabold">WriteFlow!</span>
                            </h1>

                            {/* Description */}
                            <p className="mt-4 text-gray-600 leading-relaxed text-base max-w-6xl">
                                A platform built for passionate writers and readers alike. Here, you can create, read, update, and delete your blogs while engaging with a vibrant community through likes and dislikes. Our goal is to provide a seamless and interactive blogging experience for everyone.
                            </p>

                            <p className="mt-4 text-gray-600 leading-relaxed text-base max-w-6xl">
                                WriteFlow was created by <span className="text-black font-bold">Mayur R Rao</span>, a developer passionate about building meaningful digital experiences.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};