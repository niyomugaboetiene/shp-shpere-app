import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const [product_name, setProduct_name] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { product_id } = useParams();
    const [currentProduct, setCurrentProduct] = useState([]);
    const [success, setSuccess] = useState("");
    const navigate = useNavigate()
    

    const Update = async() => {
        try {
           setIsLoading(true);

           const formData = new FormData();
           formData.append('product_name', product_name);
           formData.append('price', price);
           formData.append('stock', stock);
           if (image) formData.append('image', image);

           await axios.put(`http://localhost:5000/product/update/${product_id}`, formData, {
            withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } });
            
           setIsLoading(false);
           setProduct_name("");
           setPrice("");
           setStock("");
           setImage(null);
           setSuccess("Updated successfully");
           navigate('/');
        } catch (error) {
            const message = error.message;
            setError(message);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const GetCurrentProduct = async() => {
            try {
               const res = await axios.get(`http://localhost:5000/product/getProduct/${product_id}`);
               setCurrentProduct(res.data.product);
            } catch (error){
                 const errorMessage = error.message;
                 setError(errorMessage);
            }
        }
        
        GetCurrentProduct();
    }, []);


    return (
        <div className="flex flex-col items-center justify-center p-9 mt-4">
            <h1 className="text-center mt-16 text-3xl font-bold mb-12">Update Product</h1>

            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300">
                <div className="mb-6">
                    <label className="block text-[15px] text-gray-600 mb-2">Enter new product name</label>
                    <input 
                        type="text" 
                        value={currentProduct.product_name}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                        onChange={(e) => setProduct_name(e.target.value)}
                    />
                </div>

               <div className="mb-6">
                    <label className="block text-[15px] text-gray-600 mb-2">Enter new Price</label>
                    <input 
                        type="number" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                        onChange={(e) => setPrice(e.target.value)}
                        value={currentProduct.price}
                    />
               </div>

               <div className="mb-6">
                    <label className="block text-[15px] text-gray-600 mb-2">Enter new Stock Number</label>
                    <input 
                        type="number" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                        onChange={(e) => setStock(e.target.value)}
                        value={currentProduct.stock}
                    />
               </div>

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
                    {isLoading ? "Updating..." : "Update Product"}
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

export default UpdateProduct;