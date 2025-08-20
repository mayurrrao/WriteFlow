import { motion } from "framer-motion";
import { useState } from "react";

export const FloatingCard = ({
  title,
  content,
  className,
  movementPattern,
  rotation // static rotation in degrees as a number
}: {
  title: string;
  content: string;
  className: string;
  movementPattern: { x: number[]; y: number[] };
  rotation: number;
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className={`absolute w-28 h-30 lg:w-44 lg:h-52 cursor-pointer transition-transform ${className} cursor-auto`}
      animate={{
        x: movementPattern.x,
        y: movementPattern.y,
      }}
      whileHover={{ scale: 1.05, y: -5 }} // Small lift on hover
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      style={{ perspective: "1000px" }}
    >
      {/* Wrapper for static rotation */}
      <div style={{ transform: `rotate(${rotation}deg)` }}>
        <motion.div
          className="hidden xl:flex w-40 h-44 mx-1 my-7 rounded-xl backdrop-blur-sm shadow-lg bg-white border border-gray-200 flex-col justify-center items-center text-gray-900 relative"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {!flipped ? (
            <div className="flex flex-col p-5 lg:w-36 lg:h-40 rounded-lg items-center justify-center text-center border border-gray-100">
              <h3 className="lg:text-lg font-semibold text-sm text-gray-900">{title}</h3>
              <p className="lg:text-sm text-gray-600 mt-2 text-xs">{content}</p>
            </div>
          ) : (
            <div
              className="flex flex-col p-8 lg:w-36 lg:h-40 rounded-lg items-center justify-center text-center"
              style={{ transform: 'rotateY(180deg)' }} // counter-rotate so text is readable
            >
              <h3 className="lg:text-lg font-bold text-sm text-gray-900">Whoops!</h3>
              <p className="lg:text-xs text-gray-600 mt-1 text-xs">Flip happens 😆</p>
            </div>
          )}

        </motion.div>
      </div>
    </motion.div>
  );
};
