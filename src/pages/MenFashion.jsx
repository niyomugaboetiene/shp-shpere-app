import axios from "axios";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const MenFashion = () => {
    const [showAll, setShowAll] = useState(false);
    const [isHoveredIndex, setIsHoveredIndex] = useState(null);
    const [products, setProducts] = useState([]);
    const [cartMessage, setCartMessage] = useState(false);
    const [userCart, setUserCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const GetNewProducts = async () => {
            try {
                const product = await axios.get(`${BACKEND_URL}/product/men`, { withCredentials: true });
                setProducts(product.data.MenProduct);
            } catch (error) {
                console.log("ERROR: ", error.message);
            }
        };
        GetNewProducts();
    }, []);

    const AddToCart = async (product_id) => {
        try {
            setIsLoading(true);
            await axios.post(`${BACKEND_URL}/product/cart/add/${product_id}`, { quality: 1 }, { withCredentials: true });
            setCartMessage(true);
            await fetchUserCart();
            setTimeout(() => {
                setCartMessage(false);
            }, 2000);
        } catch (error) {
            const errorMessage = error.message;
            setError(errorMessage);
            navigate('/sign-up');
        } finally {
            setIsLoading(false);
        }
    };

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

    const isProductInCart = (product_id) => {
        return userCart.some(item => item.product_id === product_id);
    };

    const itemToShow = showAll ? products : products.slice(0, 8);
    const hasMoreItems = products.length > 8;

    return (
        <div className="flex flex-col items-center justify-center p-3 sm:p-4 md:p-6">
            {cartMessage && (
                <div className="fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 w-[90%] sm:w-auto max-w-md bg-green-500 text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg z-50 text-center text-sm sm:text-base">
                    Product added to cart successfully!
                </div>
            )}

            {error && (
                <div className="fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 w-[90%] sm:w-auto max-w-md bg-red-500 text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg z-50 text-center text-sm sm:text-base break-words">
                    {error}
                </div>
            )}

            <button
                className="self-start mb-4 px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                onClick={() => navigate(-1)}
            >
                &larr; Back
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-8 text-green-500 text-center">
                Men's Fashion
            </h2>

            {cartMessage && (
                <p className="text-green-500 text-sm mb-3 text-center">
                    Product Added successfully
                </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 w-full max-w-7xl transition-all duration-500">
                {itemToShow.map((item, idx) => (
                    <div
                        key={idx}
                        className="min-w-0 p-3 sm:p-4 rounded-2xl hover:shadow-xl transition duration-200"
                        onMouseEnter={() => setIsHoveredIndex(idx)}
                        onMouseLeave={() => setIsHoveredIndex(null)}
                    >
                        <div className="relative w-full h-64 sm:h-64 md:h-64 lg:h-72 overflow-hidden rounded-lg mb-3">
                            <img
                                src={`${BACKEND_URL}/${item.image}`}
                                alt={item.product_name}
                                className="w-full h-full object-cover hover:scale-105 transition duration-200"
                            />
                        </div>

                        <p className="text-sm sm:text-[15px] text-gray-600 break-words">
                            Name: {item.product_name}
                        </p>

                        <p className="text-sm sm:text-[15px] text-gray-600 break-words">
                            Category: {item.category}
                        </p>

                        <div className="flex flex-wrap justify-between gap-2 mt-2">
                            <p className="text-left text-xs text-gray-600">
                                {new Date(item.date).toLocaleDateString()}
                            </p>

                            <p className="text-left text-xs text-gray-600">
                                Stock: {item.stock}
                            </p>
                        </div>

                        <p className="text-center text-sm text-gray-600 font-bold mt-2">
                            ${item.price}
                        </p>

                        {isHoveredIndex === idx && (
                            <div className="flex justify-center mt-4 sm:mt-5">
                                <button
                                    className="w-full sm:w-auto"
                                    onClick={() => AddToCart(item.product_id)}
                                    disabled={isLoading}
                                >
                                    {isProductInCart(item.product_id) ? (
                                        <div className="flex items-center justify-center gap-2 bg-green-500 px-3 sm:px-4 py-2 rounded-lg text-white text-sm hover:bg-green-600 transition">
                                            <FaPlus /> Increase Quantity
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-2 bg-green-500 px-3 sm:px-4 py-2 rounded-lg text-white text-sm hover:bg-green-600 transition">
                                            <FaShoppingCart /> Add To Cart
                                        </div>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {hasMoreItems && !showAll && (
                <button
                    onClick={() => setShowAll(true)}
                    className="w-full sm:w-auto mb-5 mt-6 px-6 py-3 bg-green-500 text-white text-sm sm:text-base rounded-lg hover:shadow-xl hover:bg-green-600 transition duration-200"
                >
                    View All
                </button>
            )}

            {showAll && (
                <button
                    onClick={() => setShowAll(false)}
                    className="w-full sm:w-auto mb-8 py-3 px-6 bg-green-500 text-white text-sm sm:text-base rounded-lg hover:shadow-xl hover:bg-green-600 transition duration-200"
                >
                    View Less
                </button>
            )}

            {products.length === 0 && (
                <p className="text-center mt-10 text-sm sm:text-base text-gray-500">
                    No Men's fashion found.
                </p>
            )}
        </div>
    );
};

export default MenFashion;