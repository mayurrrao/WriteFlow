import { signupInput, SignupInput } from "@mayurrrao/medium-common-zod";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { motion } from "framer-motion";

export const Auth = () => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({ name: "", username: "", password: "" });
    const [errors, setErrors] = useState<{ name?: string; username?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [signupError, setSignupError] = useState<string | null>(null);


    // Function to handle signup request
    async function sendRequest() {
        setIsLoading(true);
        setEmailError(null);
        setSignupError(null);
        setErrors({});

        if (!postInputs.name || !postInputs.username || !postInputs.password) {
            setSignupError("All fields are required*");
            setIsLoading(false); 
            return;
        }

        const result = signupInput.safeParse(postInputs);
        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.errors.forEach((err) => {
                if (err.path[0]) {
                    fieldErrors[err.path[0]] = err.message;
                }
            });
            setErrors(fieldErrors);
            setIsLoading(false);
            return;
        }

        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs);
            localStorage.setItem("token", res.data.jwt);
            navigate("/blogs");
        } catch (e: any) {
            if (e.response?.data?.message === "Username already exists") {
                setEmailError("User already exists");
            } else {
                setSignupError("Signup Failed. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <motion.div className="relative w-full max-w-lg p-6 md:p-8 bg-white rounded-2xl shadow-lg border border-gray-200 text-gray-900 mx-auto"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

            {/* About Link */}
            <Link to={'/about'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                    className="size-6 ml-auto text-gray-600 transition duration-300 hover:scale-110 hover:text-gray-900">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
            </Link>

            {/* Loading Bar Animation */}
            {isLoading && (
                <motion.div className="fixed top-0 left-0 w-full h-1 bg-gray-900 z-50"
                    initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            )}

            {/* logo in the center */}
            <div className="mx-auto flex justify-center items-center w-14 h-14 border-2 border-gray-300 rounded-full mb-2">
                <img
                    src="/logo.jpg"
                    alt="Logo"
                    className="w-12 h-12 object-contain logo-transparent"
                />
            </div>

            {/* Header Section */}
            <h1 className="text-4xl font-extrabold pb-1 text-gray-900 text-center">WriteFlow</h1>

            {/* Sign-in Redirect */}
            <p className="text-gray-600 text-sm mt-2 text-center"> Already have an account?{" "}
                <Link to="/signin" className="text-gray-900 font-semibold hover:underline">Sign in</Link>
            </p>

            {/* Signup Form */}
            <div className="mt-5 space-y-5">
                <div className="space-y-1">
                    <LabelledInput label="Name" placeholder="Enter your name" onChange={(e) => setPostInputs({ ...postInputs, name: e.target.value })} />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div className="space-y-1">
                    <LabelledInput label="Email" placeholder="Enter any email (even non-existing)" onChange={(e) => setPostInputs({ ...postInputs, username: e.target.value })} />
                    {emailError && (<p className="text-red-500 text-sm mt-1">{emailError}</p>)}
                    {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                </div>
                <div className="space-y-1">
                    <LabelledInput label="Password" type="password" placeholder="********" onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })} />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
            </div>

            {/* Signup Error Message */}
            {signupError && (<p className="text-red-500 text-sm mt-3">{signupError}</p>)}

            {/* Signup Button */}
            <motion.button
                onClick={sendRequest}
                className="w-full mt-6 py-3 text-lg bg-gray-900 hover:bg-gray-800 focus:outline focus:outline-gray-400 text-white font-semibold rounded-xl shadow-md transition duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }} disabled={isLoading}
                style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}>

                {/* Loading Spinner */}
                {isLoading && (
                    <svg className="animate-spin size-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 16 0h-2a6 6 0 1 0-12 0H4z"></path>
                    </svg>
                )}
                Sign Up
            </motion.button>

            {/* About Us */}
            <motion.div className="mt-4 text-center text-xs text-gray-600"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <p>© 2025 WriteFlow. All rights reserved.</p>
                <Link to="/about" className="text-gray-900 hover:underline">About Us</Link>
            </motion.div>
        </motion.div>
    );
};

// Input Component with Label
interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

export function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return (
        <motion.div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700">{label}</label>
            <input
                onChange={onChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 focus:outline-none text-gray-900 placeholder-gray-500"
                type={type || "text"} placeholder={placeholder} required
            />
        </motion.div>
    );
}