import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../Hooks";
import { FullBlog } from "../components/FullBlog";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { AppBar } from "../components/AppBar";
import { useEffect } from "react";

export const Blog = () => {
  const navigate = useNavigate();

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
  }, [navigate]);

  // Get the blog ID from the URL parameters
  const { id } = useParams();

  // Fetch blog data using the custom hook
  const { loading, blog } = useBlog({ id: id || "" });

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div>
        <AppBar />
        <div className="min-h-screen bg-white text-gray-900 flex flex-col justify-center items-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // Show message if the blog is not found
  if (!blog) {
    return <div>Blog not found</div>;
  }

  // Render the full blog component
  return <FullBlog blog={blog} />;
};
