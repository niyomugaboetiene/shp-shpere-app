import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LastPage = () => {
    const [currentUser, setCurrentUser] = useState([]);
    const [currentProduct, setCurrentProduct] = useState([]);
    const [cartMessage, setCartMessage] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/user/userInfo`, {
                    withCredentials: true,
                });
                setCurrentUser(res.data.userInfo);
                console.log("current user", res.data);
            } catch (error) {
                console.log("Error fetching user info:", error.message);
            }
        };
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            const product_id = 20;
            try {
                const res = await axios.get(`${BACKEND_URL}/product/getProduct/${product_id}`, {
                    withCredentials: true,
                });
                setCurrentProduct(res.data.product);
            } catch (error) {
                console.log("Error fetching product:", error.message);
            }
        };
        fetchProducts();
    }, []);

    const AddToCart = async (product_id) => {
        try {
            await axios.post(`${BACKEND_URL}/product/cart/add/${product_id}`, { quality: 1 }, { withCredentials: true });
            setCartMessage(true);
            setTimeout(() => {
                setCartMessage("");
            }, 3000);
        } catch (error) {
            const errorMessage = error.message;
            setError(errorMessage);
            navigate('/sign-up');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen px-3 sm:px-4 py-8 sm:py-10">
            <div className="bg-black rounded-lg w-full max-w-7xl overflow-hidden">

                {cartMessage && (
                    <p className="text-green-500 text-center text-sm sm:text-base px-3 py-2">
                        Product Added successfully
                    </p>
                )}

                {error && (
                    <p className="text-red-500 text-center text-sm sm:text-base px-3 py-2 break-words">
                        {error}
                    </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6 md:p-8 relative">

                    <img
                        src={`${BACKEND_URL}/${currentProduct?.image}`}
                        alt="Speaker product"
                        className="w-full max-w-[400px] h-64 sm:h-80 md:h-full md:max-h-[450px] mx-auto object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                    />

                    {currentUser?.isAdmin && (
                        <>
                            <button
                                onClick={() => navigate(`/updates`)}
                                className="absolute top-6 right-6 sm:top-8 sm:right-8 bg-yellow-500 hover:bg-yellow-700 text-white p-2.5 sm:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                                title="Edit product"
                            >
                                <FaEdit className="text-lg sm:text-xl text-center" />
                            </button>
                        </>
                    )}

                    <div className="flex flex-col justify-center items-center text-center px-1 sm:px-3 py-4 md:py-6">
                        <p className="text-lg sm:text-xl md:text-2xl text-white font-bold mb-6 sm:mb-8 leading-relaxed">
                            Enhance your music experience by clicking to buy now button
                        </p>

                        <button
                            className="w-full sm:w-auto bg-green-500 py-3 px-8 text-white rounded-lg transition duration-200 hover:bg-green-600 hover:scale-105 text-sm sm:text-base font-semibold"
                            onClick={() => AddToCart(20)}
                        >
                            Buy Now
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LastPage;