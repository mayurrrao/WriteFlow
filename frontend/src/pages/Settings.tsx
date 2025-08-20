import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSettings } from "../Hooks";
import { AppBar } from "../components/AppBar";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Link, useNavigate } from "react-router-dom";

export const Settings = () => {
  const { updateSettings, updateLoading, settingsLoading, error, success, settings } = useSettings();
  const [formData, setFormData] = useState({ name: "", username: "", password: "" });
  const [validationError, setValidationError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
  }, [navigate]);

  // When settings update, populate form inputs with current settings
  useEffect(() => {
    setFormData({ ...formData, name: settings.name, username: settings.username });
  }, [settings]);

  // Update form data when an input value changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Validate inputs and update settings if all checks pass
  const handleUpdate = async () => {
    setValidationError(null);
    if (!formData.name || !formData.username || !formData.password) {
      setValidationError("All fields are required*");
      return;
    }
    if (formData.password.length < 6) {
      setValidationError("Password must be at least 6 characters*");
      return;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.username)) {
      setValidationError("Invalid email format for username*");
      return;
    }
    await updateSettings(formData);
  };

  // If settings are still loading, show a loading spinner
  if (settingsLoading) {
    return (
      <div className="bg-white min-h-screen text-gray-900 flex flex-col">
        <AppBar />
        <div className="flex-grow flex justify-center items-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // Main render of the settings form
  return (
    <div className="bg-white min-h-screen text-gray-900">
      <AppBar />
      <div className="flex justify-center pt-20 px-4">
        <div className="w-full max-w-4xl space-y-6 p-4 sm:p-5 lg:p-7 bg-white rounded-2xl shadow-sm border border-gray-200">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="p-6 w-full rounded-xl bg-white border border-gray-200 backdrop-blur-md">
            <motion.div
              initial={{ x: -40 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}>

              {/* Page heading and description */}
              <div className="mb-6 mt-1 text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Manage Your Account</h1>
                <p className="text-xs md:text-sm text-gray-600 mt-1">
                  Update your personal details and preferences here
                </p>
              </div>

              <div className="space-y-5 mt-5">
                {/* Name input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} autoComplete="off" placeholder="Enter your name" className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" />
                </div>

                {/* Email input */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input id="username" type="text" name="username" value={formData.username} onChange={handleChange} autoComplete="off" placeholder="Enter your username" className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" />
                </div>

                {/* New password input */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} autoComplete="off" placeholder="Enter a new password" className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" />
                </div>

                {/* Update button with loading state */}
                <motion.button onClick={handleUpdate} whileHover={{ scale: 1.02 }} disabled={updateLoading} className={`mt-4 w-full py-3 font-semibold rounded-lg shadow-md transition-all duration-300 focus:ring-2 focus:ring-gray-500 flex items-center justify-center space-x-2 
                  ${updateLoading ? "bg-gray-600 hover:bg-gray-600 cursor-not-allowed text-white" : "bg-gray-900 hover:bg-gray-800 text-white"}`}>
                  {updateLoading ? (
                    <>
                      <svg className="animate-spin size-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        < circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 16 0h-2a6 6 0 1 0-12 0H4z"></path>
                      </svg>
                      <span>Applying...</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>
                      <span>Apply Changes</span>
                    </>
                  )}
                </motion.button>

              </div>
              {/* Display validation or API errors */}
              {(validationError || error) && <p className="text-red-500 text-center mt-3">{validationError || error}</p>}
              {/* Display success message */}
              {success && <p className="text-green-600 text-center mt-3">Changes applied successfully!</p>}

              <div className="mt-5 text-center text-sm space-x-1 text-gray-600 flex justify-center">
                <p>Want to <span className="text-red-500">delete</span> your account?</p>
                <Link to="/delete" className="text-gray-700 hover:underline">
                  Click here
                </Link>
              </div>

            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
