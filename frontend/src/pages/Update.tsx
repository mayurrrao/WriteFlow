import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../Hooks";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { AppBar } from "../components/AppBar";
import { Edit } from "./Edit";
import { useEffect } from "react";

export const Update = () => {
    const { id } = useParams(); // Get blog ID from URL params
    const { loading, blog } = useBlog({ id: id || "" }); // Fetch blog data
    const navigate = useNavigate();

    // Redirect to login if user is not logged in
    useEffect(() => {
        if (!localStorage.getItem("token")) navigate("/");
    }, [navigate]);

    // Show loading spinner while fetching data
    if (loading) {
        return (
            <div>
                <AppBar />
                <div className="min-h-screen bg-white text-gray-900 flex flex-col">
                    <div className="flex flex-grow justify-center items-center">
                        <LoadingSpinner />
                    </div>
                </div>
            </div>
        );
    }

    // Show message if blog is not found
    if (!blog) {
        return <div>Blog not found</div>;
    }

    // Render the Edit component with blog data
    return (
        <div>
            <Edit blog={blog} />
        </div>
    );
};
