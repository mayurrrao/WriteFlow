import { useRef } from "react";
import { About } from "../components/AboutStyle";
import { AppBar3 } from "../components/AppBar3";
import { BlogSlider } from "../components/BlogSlider";
import HeroSection from "../components/HeroSection";
import ExpressYourselfCard from "../components/1BlogCard";
import ShareKnowledgeCard from "../components/2BlogCard";
import ImproveSkillsCard from "../components/3BlogCard";

export default function Home() {

    const blogSliderRef = useRef<HTMLDivElement | null>(null);
    return (
        <div className="bg-white min-h-screen select-none">
            {/* App Bar */}
            <AppBar3 />

            {/* Hero Section */}
            <HeroSection blogSliderRef={blogSliderRef} />

            {/*Cards */}
            <ExpressYourselfCard />
            <ShareKnowledgeCard />
            <ImproveSkillsCard />

            {/*Blog Slider Section */}
            <div ref={blogSliderRef}>
                <BlogSlider />
            </div>

            {/* About Section */}
            <About />
        </div>
    );
}
