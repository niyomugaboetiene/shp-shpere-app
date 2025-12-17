import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [product_name, setProduct_name] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [isLoaing, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("")
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    
    const categories = ["Women's Fashion", "Men's Fashion", "Medecine", "Baby's & Toys", "Home & Lifestyle", "Heath & Beauty", "Electronics"];

    const Add = async() => {
        if (!product_name || !category || !price || !stock || !image) {
            alert("All fields are required");
            return;
        }

        const formData = new FormData();
        formData.append('product_name', product_name);
        formData.append("category", category);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("image", image);
        try {
            setIsLoading(true);
            await axios.post('http://localhost:5000/product/add', formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });
            
            setSuccess("Product added successfully");
            setTimeout(() => {
                setSuccess("");
            }, 6000);
            setIsLoading(false);
            navigate('/');

        } catch (error) {
            console.error("ERROR:", error.message);
            setError("Error during add product");
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
            <h1 className="text-center mt-16 text-3xl font-bold mb-12">Add New Product</h1>

            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300">
                <div className="mb-6">
                    <label className="block text-[15px] text-gray-600 mb-2">Product Name</label>
                    <input 
                        type="text" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                        onChange={(e) => setProduct_name(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-[15px] text-gray-600 mb-2">Price</label>
                    <input 
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-[15px] text-gray-600 mb-2">Category</label>
                    <select 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat, idx) => (
                            <option key={idx} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <label className="block text-[15px] text-gray-600 mb-2">Numbers in Stock</label>
                    <input 
                        type="number"  
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                        onChange={(e) => setStock(e.target.value)}
                    />
                </div>            

                <div className="mb-8">
                    <label className="block text-[15px] text-gray-600 mb-2">Product Image</label>
                    <input 
                        type="file"  
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                        onChange={(e) => setImage(e.target.files[0])}
                        accept="image/*"
                    />
                </div>

                <button 
                    onClick={Add}
                    disabled={isLoaing}
                    className="w-full bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg text-white hover:shadow-lg transition duration-200 disabled:bg-green-300 disabled:cursor-not-allowed"
                >
                    {isLoaing ? "Adding..." : "Add Product"}
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

export default AddProduct