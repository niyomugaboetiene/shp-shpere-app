import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const RegisterAccount = () => {
    const [user_name, setUser_name] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const Register = async () => {
        if (!user_name || !password || !image) {
            alert("All fields are required");
            return;
        }

        const formData = new FormData();
        formData.append("user_name", user_name);
        formData.append("password", password);
        formData.append("image", image);

        try {
            setIsLoading(true);

            await axios.post(`${BACKEND_URL}/user/register`, formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });

            setSuccess("Account created successfully");

            setTimeout(() => {
                setSuccess("");
                navigate("/sign-up");
            }, 2000);

        } catch (error) {
            setError("Username already taken");

            setTimeout(() => {
                setError("");
            }, 6000);

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-3 sm:px-5 md:px-8 py-6 sm:py-10">

            <div className="w-full max-w-md">

                <button
                    className="mb-5 sm:mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200 text-sm sm:text-base"
                    onClick={() => navigate(-1)}
                >
                    &larr; Back
                </button>

                <h1 className="text-center mt-6 sm:mt-10 md:mt-12 text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 md:mb-12 text-green-500">
                    Create Your Account
                </h1>

                <div className="bg-white p-5 sm:p-7 md:p-8 rounded-2xl shadow-2xl w-full transition-all duration-300">

                    <div className="mb-5 sm:mb-6">
                        <label className="block text-sm sm:text-[15px] text-gray-600 mb-2">
                            Username
                        </label>

                        <input
                            type="text"
                            className="w-full min-w-0 px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 text-sm sm:text-base"
                            onChange={(e) => setUser_name(e.target.value)}
                            value={user_name}
                        />
                    </div>

                    <div className="mb-5 sm:mb-6">
                        <label className="block text-sm sm:text-[15px] text-gray-600 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            className="w-full min-w-0 px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 text-sm sm:text-base"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>

                    <div className="mb-7 sm:mb-8">
                        <label className="block text-sm sm:text-[15px] text-gray-600 mb-2">
                            Choose your profile image
                        </label>

                        <input
                            type="file"
                            className="w-full min-w-0 px-2 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 text-xs sm:text-sm"
                            onChange={(e) => setImage(e.target.files[0])}
                            accept="image/*"
                        />

                        {image && (
                            <p className="mt-2 text-xs sm:text-sm text-gray-500 break-all">
                                Selected: {image.name}
                            </p>
                        )}
                    </div>

                    <button
                        onClick={Register}
                        disabled={isLoading}
                        className="w-full bg-green-500 hover:bg-green-600 px-5 sm:px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg transition duration-200 disabled:bg-green-300 disabled:cursor-not-allowed mb-4 text-sm sm:text-base"
                    >
                        {isLoading ? "Registering..." : "Create Account"}
                    </button>

                    {error && (
                        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg transition duration-200 text-sm sm:text-base break-words">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg transition duration-200 text-sm sm:text-base break-words">
                            {success}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default RegisterAccount;