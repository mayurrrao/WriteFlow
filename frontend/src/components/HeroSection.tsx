import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RefObject, useEffect, useState } from "react";
import { FloatingCard } from "./FloatingCards";

interface HeroSectionProps {
    blogSliderRef: RefObject<HTMLDivElement>;
}
export default function HeroSection({ blogSliderRef }: HeroSectionProps) {
    // Typing Animation State
    const words = ["Your Stories", "Your Voice", "Your Platform"];
    const [wordIndex, setWordIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const typingSpeed = isDeleting ? 50 : 100;
        const targetWord = words[wordIndex];

        if (!isDeleting && displayedText === targetWord) {
            setTimeout(() => setIsDeleting(true), 1200);
        } else if (isDeleting && displayedText === "") {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
        }

        const timeout = setTimeout(() => {
            setDisplayedText((prev) =>
                isDeleting ? prev.slice(0, -1) : targetWord.slice(0, prev.length + 1)
            );
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, wordIndex]);

    const scrollToBlogs = () => {
        if (blogSliderRef?.current) {
            blogSliderRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 overflow-hidden px-4">
            {/* Floating Interactive Elements */}
            <motion.div
                className="absolute w-[200px] md:w-[300px] lg:w-[350px] h-[200px] md:h-[300px] lg:h-[350px] bg-gray-200/20 rounded-full blur-[80px] md:blur-[100px] lg:blur-[120px] pointer-events-none"
                style={{ top: "5%", left: "5%" }}
                animate={{
                    x: [0, 300, -200, 250, 0],
                    y: [0, -150, 200, -200, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                className="absolute w-[180px] md:w-[250px] lg:w-[300px] h-[180px] md:h-[250px] lg:h-[300px] bg-gray-300/20 rounded-full blur-[70px] md:blur-[90px] lg:blur-[100px] pointer-events-none"
                style={{ bottom: "10%", right: "10%" }}
                animate={{
                    x: [0, -250, 150, -200, 0],
                    y: [0, 120, -150, 150, 0]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating Cards */}
            <FloatingCard
                title="Write Your Ideas"
                content="Express your thoughts freely."
                className="top-20 md:top-40 left-10 md:left-40"
                movementPattern={{ x: [0, 20, -30, 15, -10, 0], y: [0, -15, 20, -10, 5, 0] }}
                rotation={-10}
            />

            <FloatingCard
                title="Build Community"
                content="Connect with like-minded people."
                className="top-10 md:top-20 right-20 md:right-80 pl-8 pt-3"
                movementPattern={{ x: [0, 25, -10, 15, -20, 0], y: [0, -20, 10, -15, 5, 0] }}
                rotation={6}
            />

            <FloatingCard
                title="Inspire Others"
                content="Your words can make a difference."
                className="bottom-10 md:bottom-20 left-20 md:left-80"
                movementPattern={{ x: [0, -10, 15, -20, 25, -15, 0], y: [0, 20, -10, 15, -5, 0] }}
                rotation={8}
            />

            <FloatingCard
                title="Share Your Knowledge"
                content="Help others by sharing insights."
                className="bottom-20 md:bottom-40 right-10 md:right-40 pt-5"
                movementPattern={{ x: [0, -15, 25, -10, 5, 0], y: [0, 10, -20, 15, -10, 0] }}
                rotation={-12}
            />

            {/* Content Wrapper */}
            <div className="relative z-10 flex flex-col items-center text-center">
                {/* Animated Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-4xl md:text-6xl font-extrabold leading-tight transition-transform duration-300 hover:scale-105"
                >
                    <span className="text-gray-900">{displayedText}</span>
                    <span className="text-gray-400 animate-pulse font-normal">|</span>
                </motion.h1>

                {/* Animated Subtext */}
                <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-600 max-w-[90%] md:max-w-xl hover:text-gray-700 transition-colors duration-300">
                    Start writing and sharing your thoughts with the world. Blogging made easy, expressive, and powerful.
                </p>

                {/* Call to Action Buttons */}
                <div className="mt-4 md:mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    {/* Button 1: Start Writing */}
                    <Link
                        to="/signup"
                        className="px-5 md:px-6 py-2 md:py-3 bg-gray-900 hover:bg-black text-white font-semibold text-base md:text-lg shadow-sm transition-all duration-300 hover:scale-105 flex items-center justify-center rounded-full"
                    >
                        Start Writing
                    </Link>

                    {/* Button 2: Explore Blogs */}
                    <button
                        onClick={scrollToBlogs}
                        className="px-5 md:px-6 py-2 md:py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold text-base md:text-lg shadow-sm transition-all duration-300 hover:scale-105 flex items-center justify-center rounded-full"
                    >
                        Explore Blogs
                    </button>
                </div>
            </div>
        </div>
    );
}
