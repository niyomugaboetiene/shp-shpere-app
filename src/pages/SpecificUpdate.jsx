import { useState } from "react";
import axios from "axios";

const SpecificUpdation = () => {
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const product_id = 20;

    const Update = async() => {
        try {
           setIsLoading(true);

           const formData = new FormData();
           if (image) formData.append('image', image);

           await axios.put(`http://localhost:5000/product/update/${product_id}`, formData, {
            withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } });
            
           setIsLoading(false);
           setImage(null);
           setSuccess("Updated successfully");
           
           setTimeout(() => {
               setSuccess("");
           }, 3000);
        } catch (error) {
            const message = error.message;
            setError(message);
            setIsLoading(false);
            
            setTimeout(() => {
                setError("");
            }, 3000);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center p-9 mt-4">
            <h1 className="text-center mt-16 text-3xl font-bold mb-12">Update Product Image</h1>

            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300">
               <div className="mb-8">
                    <label className="block text-[15px] text-gray-600 mb-2">Choose an image</label>
                    <input 
                        type="file" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                        onChange={(e) => setImage(e.target.files[0])} 
                        accept="image/*"
                    />
               </div>
               
               <button 
                    onClick={Update}
                    disabled={isLoading}
                    className="w-full bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg text-white hover:shadow-lg transition duration-200 disabled:bg-green-300 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Updating..." : "Update Image"}
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

export default SpecificUpdation;