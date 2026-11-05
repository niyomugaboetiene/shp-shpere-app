import axios from "axios";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Health = () => {
    const [showAll, setShowAll] = useState(false);
    const [isHoveredIndex, setIsHoveredIndex] = useState(null);
    const [products, setProducts] = useState([]);
    const [cartMessage, setCartMessage] = useState(false);
    const [userCart, setUserCart] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const GetNewProducts = async () => {
                const product = await axios.get(`${BACKEND_URL}/product/health`, { withCredentials: true });
                setProducts(product.data.ToysProduct);
            };
            GetNewProducts();
        } catch (error) {
            console.log("ERROR: ", error.message);
        }
    }, []);

    const AddToCart = async (product_id) => {
        try {
            await axios.post(`${BACKEND_URL}/product/cart/add/${product_id}`, { quality: 1 }, { withCredentials: true });
            setCartMessage(true);
            await fetchUserCart();
            setTimeout(() => {
                setCartMessage("");
            }, 4000);

        } catch (error) {
            const errorMessage = error.message;
            setError(errorMessage);
            navigate('/sign-up');
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
        <div className="flex flex-col items-center justify-center px-3 sm:px-6 md:p-6 py-6 sm:py-8 w-full min-w-0">
            <button
                className="self-start mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm sm:text-base"
                onClick={() => navigate(-1)}
            >
                &larr; Back
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-green-500 text-center">
                Health & Beauty Products
            </h2>

            {cartMessage && (
                <p className="text-green-500 text-sm sm:text-base text-center mb-3">
                    Product Added successfully
                </p>
            )}

            {error && (
                <p className="text-red-500 text-sm sm:text-base text-center mb-3 break-words">
                    {error}
                </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 w-full max-w-7xl transition-all duration-500">
                {itemToShow.map((item, idx) => (
                    <div
                        key={idx}
                        className="p-3 sm:p-4 min-w-0 rounded-2xl hover:shadow-xl transition duration-200"
                        onMouseEnter={() => setIsHoveredIndex(idx)}
                        onMouseLeave={() => setIsHoveredIndex(null)}
                    >
                        <div className="w-full h-64 sm:h-72 md:h-74 overflow-hidden rounded-lg mb-3">
                            <img
                                src={`${BACKEND_URL}/${item.image}`}
                                className="w-full h-full object-cover hover:scale-105 transition duration-200"
                                alt={item.product_name}
                            />
                        </div>

                        <p className="text-sm sm:text-[15px] text-gray-600 break-words">
                            Name: {item.product_name}
                        </p>

                        <p className="text-sm sm:text-[15px] text-gray-600 break-words">
                            Category: {item.category}
                        </p>

                        <div className="flex flex-wrap justify-between gap-2 mt-2">
                            <p className="text-center text-xs text-gray-600">
                                {new Date(item.date).toLocaleDateString()}
                            </p>

                            <p className="text-center text-xs text-gray-600">
                                Stock: {item.stock}
                            </p>
                        </div>

                        <p className="text-center text-sm text-gray-600 font-bold mt-2">
                            ${item.price}
                        </p>

                        {(isHoveredIndex === idx || window.innerWidth < 768) && (
                            <div className="flex justify-center mt-4 sm:mt-5">
                                <button
                                    onClick={() => AddToCart(item.product_id)}
                                    className="w-full sm:w-auto"
                                >
                                    {isProductInCart(item.product_id) ? (
                                        <div className="flex items-center justify-center gap-2 bg-green-500 px-3 sm:px-4 py-2 rounded-lg text-white hover:bg-green-600 transition text-sm sm:text-base whitespace-nowrap">
                                            <FaPlus /> Increase Quantity
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-2 bg-green-500 px-3 sm:px-4 py-2 rounded-lg text-white hover:bg-green-600 transition text-sm sm:text-base whitespace-nowrap">
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
                    className="mb-5 mt-6 w-full sm:w-auto px-6 py-3 bg-green-500 text-white rounded-lg hover:shadow-xl hover:bg-green-600 transition duration-200 text-sm sm:text-base"
                >
                    View All
                </button>
            )}

            {showAll && (
                <button
                    className="mb-8 mt-6 w-full sm:w-auto py-3 px-6 bg-green-500 text-white rounded-lg hover:shadow-xl hover:bg-green-600 transition duration-200 text-sm sm:text-base"
                    onClick={() => setShowAll(false)}
                >
                    View Less
                </button>
            )}

            {products.length === 0 && (
                <p className="text-center mt-10 text-gray-500 text-sm sm:text-base">
                    No Health & Beauty Products found.
                </p>
            )}
        </div>
    );
};

export default Health;