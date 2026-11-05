import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaPlus } from "react-icons/fa";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const SearchResults = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const products = state?.results || [];

    const [isHoveredIndex, setIsHoveredIndex] = useState(null);
    const [userCart, setUserCart] = useState([]);
    const [cartMessage, setCartMessage] = useState(false);
    const [error, setError] = useState(null);

    const fetchUserCart = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/product/cart`, {
                withCredentials: true,
            });

            setUserCart(res.data.cart || []);
        } catch (error) {
            console.log("Error fetching user cart:", error.message);
        }
    };

    useEffect(() => {
        fetchUserCart();
    }, []);

    const AddToCart = async (product_id) => {
        try {
            await axios.post(
                `${BACKEND_URL}/product/cart/add/${product_id}`,
                { quality: 1 },
                { withCredentials: true }
            );

            setCartMessage(true);
            setError(null);
            fetchUserCart();

        } catch (error) {
            setError(error.message);
            console.log("Add to cart error:", error.message);
            navigate("/sign-up");
        }
    };

    const isProductInCart = (product_id) => {
        return userCart.some((item) => item.product_id === product_id);
    };

    return (
        <div className="min-h-screen flex flex-col items-center px-3 sm:px-5 md:px-8 py-6 sm:py-8 mt-16 sm:mt-20">

            <div className="w-full max-w-7xl">

                <button
                    className="mb-5 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200 text-sm sm:text-base"
                    onClick={() => navigate(-1)}
                >
                    &larr; Back
                </button>

                <h2 className="text-2xl sm:text-3xl font-bold mb-7 sm:mb-8 text-green-500 text-center sm:text-left">
                    Search Results
                </h2>

                {products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center">
                        <FaShoppingCart className="text-5xl sm:text-6xl text-gray-300 mb-4" />

                        <p className="text-gray-500 text-base sm:text-lg">
                            No products found.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 w-full">

                        {products.map((item, idx) => (
                            <div
                                key={item._id || idx}
                                className="min-w-0 p-3 sm:p-4 rounded-2xl hover:shadow-xl transition duration-200 border border-gray-100"
                                onMouseEnter={() => setIsHoveredIndex(idx)}
                                onMouseLeave={() => setIsHoveredIndex(null)}
                            >
                                <div className="w-full h-60 sm:h-64 md:h-64 lg:h-72 overflow-hidden rounded-lg mb-3">
                                    <img
                                        src={`${BACKEND_URL}/${item.image}`}
                                        alt={item.product_name}
                                        className="w-full h-full object-cover hover:scale-105 transition duration-200"
                                    />
                                </div>

                                <p className="text-sm sm:text-[15px] text-gray-600 font-medium break-words">
                                    Name: {item.product_name}
                                </p>

                                <p className="text-sm sm:text-[15px] text-gray-600 break-words mt-1">
                                    Category: {item.category}
                                </p>

                                <div className="flex flex-wrap justify-between items-center gap-2 mt-2">
                                    <p className="text-xs text-gray-600">
                                        {new Date(item.date).toLocaleDateString()}
                                    </p>

                                    <p className="text-xs text-gray-600">
                                        Stock: {item.stock}
                                    </p>
                                </div>

                                <p className="text-center text-sm sm:text-base text-gray-800 font-bold mt-3">
                                    ${item.price}
                                </p>

                                <div className={`flex justify-center mt-4 sm:mt-5 transition duration-200 ${
                                    isHoveredIndex === idx ? "opacity-100" : "opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                                }`}>
                                    <button
                                        onClick={() => AddToCart(item.product_id)}
                                        className="w-full flex items-center justify-center gap-2 bg-green-500 px-3 sm:px-4 py-2.5 rounded-lg text-white hover:bg-green-600 transition text-sm sm:text-base font-medium"
                                    >
                                        {isProductInCart(item.product_id) ? (
                                            <>
                                                <FaPlus />
                                                Increase Quantity
                                            </>
                                        ) : (
                                            <>
                                                <FaShoppingCart />
                                                Add To Cart
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>
                )}

                {error && (
                    <p className="text-red-500 mt-5 bg-red-100 px-3 py-3 rounded-md text-sm sm:text-base break-words">
                        {error}
                    </p>
                )}

                {cartMessage && (
                    <p className="text-green-600 mt-5 bg-green-100 px-3 py-3 rounded-md text-sm sm:text-base">
                        Added to cart successfully!
                    </p>
                )}

            </div>
        </div>
    );
};

export default SearchResults;