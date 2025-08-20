import { motion } from "framer-motion";

export const QuoteSignup = () => {
    return (
        <motion.div 
            className="text-center max-w-lg" 
            whileHover={{ scale: 1.05 }} 
            transition={{ duration: 0.3 }} // Smooth hover effect
        >
            {/* Main quote text */}
            <blockquote className="text-3xl font-bold leading-relaxed text-gray-900">
                "Every story begins with a single word."
            </blockquote>
            
            {/* Author attribution */}
            <div className="mt-4 text-lg font-bold text-gray-900">WriteFlow</div>
            <div className="text-gray-600 text-sm">Your Writing Platform</div>
        </motion.div>
    );
};
