export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {/* Adjust the sizes for mobile first, then for larger screens */}
      <div className="relative w-14 h-14 flex items-center justify-center animate-bounce">
        {/* Outer glow effect */}
        <div className="absolute inset-0 w-full h-full animate-ping rounded-full bg-gradient-to-r from-gray-600 to-gray-500 opacity-30"></div>

        {/* Inner logo container */}
        <div className="relative w-full h-full border-2 border-gray-300 rounded-full flex items-center justify-center bg-white">
          {/* Circular logo in the center */}
          <img
            src="/logo.jpg"
            alt="Logo"
            className="w-10 h-10 object-contain rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
