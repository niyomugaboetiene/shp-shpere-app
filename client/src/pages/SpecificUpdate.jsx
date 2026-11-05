import { useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const SpecificUpdation = () => {
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const product_id = 20;

    const Update = async () => {
        if (!image) {
            setError("Please choose an image first.");
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        }

        try {
            setIsLoading(true);
            setError("");

            const formData = new FormData();
            formData.append("image", image);

            await axios.put(
                `${BACKEND_URL}/product/update/${product_id}`,
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            setImage(null);
            setSuccess("Updated successfully");

            setTimeout(() => {
                setSuccess("");
            }, 3000);

        } catch (error) {
            const message = error.message;
            setError(message);

            setTimeout(() => {
                setError("");
            }, 3000);

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-3 sm:px-5 md:px-8 py-8 sm:py-10 mt-4">

            <div className="w-full max-w-md">

                <h1 className="text-center mt-6 sm:mt-10 md:mt-16 text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 md:mb-12 text-gray-900">
                    Update Product Image
                </h1>

                <div className="bg-white p-5 sm:p-7 md:p-8 rounded-2xl shadow-2xl w-full transition-all duration-300">

                    <div className="mb-6 sm:mb-8">
                        <label className="block text-sm sm:text-[15px] text-gray-600 mb-2">
                            Choose an image
                        </label>

                        <input
                            type="file"
                            className="w-full min-w-0 px-2 sm:px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 text-xs sm:text-sm"
                            onChange={(e) => setImage(e.target.files[0] || null)}
                            accept="image/*"
                        />

                        {image && (
                            <p className="mt-3 text-xs sm:text-sm text-gray-500 break-all">
                                Selected: {image.name}
                            </p>
                        )}
                    </div>

                    <button
                        onClick={Update}
                        disabled={isLoading}
                        className="w-full bg-green-500 hover:bg-green-600 px-5 sm:px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg transition duration-200 disabled:bg-green-300 disabled:cursor-not-allowed text-sm sm:text-base"
                    >
                        {isLoading ? "Updating..." : "Update Image"}
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

export default SpecificUpdation;