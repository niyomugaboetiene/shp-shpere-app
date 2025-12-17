import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterAccount = () => {
    const [user_name, setUser_name] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("")
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const Register = async() => {
        if (!user_name || !password || !image) {
            alert("All fields are required");
            return;
        }

        const formData = new FormData();
        formData.append('user_name', user_name);
        formData.append("password", password);
        formData.append("image", image);
        try {
            setIsLoading(true);
            await axios.post('http://localhost:5000/user/register', formData, {
                withCredentials: true,
               headers: { "Content-Type": "multipart/form-data" },
            });
            
            setSuccess("Account created successfully");
            setTimeout(() => {
                setSuccess("");
                navigate('/sign-up'); 
            }, 2000);
            setIsLoading(false);
        } catch (error) {
            setError("User name already taked");
            setTimeout(() => {
                setError("");
            }, 6000);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }  


    return (
        <div className="flex flex-col items-center justify-center p-9 mt-4">
            <button
                className="self-start mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                onClick={() => navigate(-1)}
            >
                &larr; Back
            </button>

            <h1 className="text-center mt-16 text-3xl font-bold mb-12 text-green-500">Create Your Account</h1>

            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300">
                <div className="mb-6">
                    <label className="block text-[15px] text-gray-600 mb-2">Username</label>
                    <input 
                        type="text" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                        onChange={(e) => setUser_name(e.target.value)}
                        value={user_name}
                    />
                </div>

                 <div className="mb-6">
                    <label className="block text-[15px] text-gray-600 mb-2">Password</label>
                    <input 
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                     />
                 </div>
        
                <div className="mb-8">
                    <label className="block text-[15px] text-gray-600 mb-2">Choose your profile image</label>
                    <input 
                        type="file"  
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                        onChange={(e) => setImage(e.target.files[0])}
                        accept="image/*"
                    />
                </div>

                <button 
                    onClick={Register}
                    disabled={isLoading}
                    className="w-full bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg text-white hover:shadow-lg transition duration-200 disabled:bg-green-300 disabled:cursor-not-allowed mb-4"
                >
                    {isLoading ? "Registering..." : "Create Account"}
                </button>

                {error && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg transition duration-200">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg transition duration-200">
                        {success}
                    </div>
                )}
            </div>
        </div>
    )
}

export default RegisterAccount