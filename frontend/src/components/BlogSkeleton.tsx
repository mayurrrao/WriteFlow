export const BlogSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="p-5 w-full max-w-4xl mx-auto cursor-pointer bg-white rounded-lg shadow-sm border border-gray-200">
                
                {/* Top Section: Avatar and Author Info */}
                <div className="flex items-center space-x-3">
                    {/* Circular Avatar Placeholder */}
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    {/* Author Name and Date Placeholders */}
                    <div className="space-y-2">
                        <div className="h-4 w-28 bg-gray-200 rounded-full"></div>
                        <div className="h-3 w-24 bg-gray-200 rounded-full"></div>
                    </div>
                </div>

                {/* Title Placeholder */}
                <div className="mt-4">
                    <div className="h-4 w-4/5 bg-gray-200 rounded-lg"></div>
                </div>

                {/* Content Placeholders */}
                <div className="mt-4 space-y-3">
                    <div className="h-4 w-full bg-gray-200 rounded-lg"></div>
                    <div className="h-4 w-5/6 bg-gray-200 rounded-lg"></div>
                </div>

                {/* Bottom Section: Reading Time */}
                <div className="mt-4 flex justify-between">
                    <div className="h-4 w-20 bg-gray-200 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
};
