export const About = () => {
    return (
        <section className="text-gray-900 text-center py-8 px-4 bg-gray-50 shadow-sm border-t border-gray-200 select-none">
            <div className="max-w-md mx-auto space-y-4">
                {/* Title with Logo */}
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center justify-center gap-1">
                    Discover <span className="text-gray-700 ml-1">WriteFlow</span>
                    <img src="/logo.jpg" alt="Logo" className="w-9 h-9 object-contain logo-transparent" />
                </h2>

                {/* Shortened Description */}
                <p className="text-sm text-gray-600">
                    A space for writers & readers. Share stories, engage, and be part of a meaningful community.
                </p>
            </div>
        </section>
    );
};
