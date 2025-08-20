import { Auth } from "../components/Auth";
import { QuoteSignup } from "../components/QuoteSignup";
import { motion } from "framer-motion";

export const Signup = () => {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute w-[200px] md:w-[300px] lg:w-[350px] h-[200px] md:h-[300px] lg:h-[350px] bg-gray-100 rounded-full blur-[80px] md:blur-[100px] lg:blur-[120px] pointer-events-none"
          style={{ top: "5%", left: "5%" }}
          animate={{
            x: [0, 300, -200, 250, 0],
            y: [0, -150, 200, -200, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute w-[180px] md:w-[250px] lg:w-[300px] h-[180px] md:h-[250px] lg:h-[300px] bg-gray-50 rounded-full blur-[70px] md:blur-[90px] lg:blur-[100px] pointer-events-none"
          style={{ bottom: "10%", right: "10%" }}
          animate={{
            x: [0, -250, 150, -200, 0],
            y: [0, 120, -150, 150, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Quote Section - Only visible on large screens */}
          <div className="hidden lg:flex items-center justify-center bg-gray-50">
            <QuoteSignup />
          </div>

          {/* Authentication Section */}
          <div className="flex items-center justify-center p-6 md:p-10 lg:p-12 w-full bg-white text-gray-900">
            <Auth />
          </div>
        </div>
      </div>
    </div>
  );
};
