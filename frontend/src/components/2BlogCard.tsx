import { useState } from "react";
import { FaBookOpen } from "react-icons/fa";

const ShareKnowledgeCard = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative w-full flex flex-col md:flex-row items-center bg-white border border-gray-200 p-10 shadow-sm transition-all duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)} // Enable animations on touch
            onTouchEnd={() => setIsHovered(false)} // Reset state on touch end
        >
            {/* Floating Background Effect */}
            <div
                className={`absolute top-10 left-0.5 w-24 h-24 bg-green-100 rounded-full blur-xl transition-transform duration-700 ${isHovered ? "translate-x-1 -translate-y-8 opacity-30" : "opacity-20"
                    }`}
            ></div>

            {/* Left Side: Icon and Main Content */}
            <div className="flex-1 text-left">
                <div className="flex items-center gap-3">
                    <FaBookOpen
                        className={`text-3xl transition-all duration-300 ${isHovered ? "text-green-700 scale-110" : "text-green-600"
                            }`}
                    />
                    <h2 className="text-3xl font-semibold text-gray-900 transition-all duration-300">
                        Share Your Knowledge
                    </h2>
                </div>
                <p
                    className={`mt-4 text-lg transition-all duration-300 ${isHovered ? "text-gray-700" : "text-gray-600"
                        }`}
                >
                    Your experiences and skills can help others. Write blogs to educate, inspire, and make a difference.
                </p>
                {/* Additional Content that appears on hover */}
                <div
                    className={`mt-6 transition-all duration-500 transform ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                >
                    <p className="text-md text-gray-700">Benefits of sharing knowledge:</p>
                    <ul className="list-disc list-inside text-gray-600 mt-2">
                        <li>Inspire and educate others</li>
                        <li>Build credibility in your field</li>
                        <li>Leave a lasting impact</li>
                    </ul>
                </div>
            </div>

            {/* Right Side: Interactive Floating Elements */}
            <div className="relative flex-1 flex justify-end items-center space-x-4">
                <div
                    className={`w-20 h-20 bg-gray-100 rounded-lg shadow-sm transition-all duration-500 ${isHovered ? "translate-y-2 scale-105 shadow-md" : "scale-100"
                        }`}
                ></div>
                <div
                    className={`w-16 h-16 bg-green-100 rounded-lg shadow-sm transition-all duration-500 ${isHovered ? "-translate-y-2 scale-110 shadow-md" : "scale-100"
                        }`}
                ></div>
                {/* Extra Floating Element for more interactivity */}
                <div
                    className={`w-12 h-12 bg-gray-200 rounded-full transition-transform duration-500 ${isHovered ? "rotate-12 scale-110" : "rotate-0"
                        }`}
                ></div>
            </div>
        </div>
    );
};

export default ShareKnowledgeCard;
