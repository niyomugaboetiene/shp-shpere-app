import axios from "axios";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const WomenFashion = () => {
    const [showAll, setShowAll] = useState(false);
    const [isHoveredIndex, setIsHoveredIndex] = useState(null);
    const [products, setProducts] = useState([]);
    const [cartMessage, setCartMessage] = useState(false);
    const [userCart, setUserCart] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const GetNewProducts = async () => {
            try {
                const product = await axios.get(
                    `${BACKEND_URL}/product/women`,
                    { withCredentials: true }
                );

                setProducts(product.data.womemProduct || []);
            } catch (error) {
                console.log("ERROR: ", error.message);
                setError("Unable to load women's fashion products.");
            }
        };

        GetNewProducts();
    }, []);

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
            setError("");

            setTimeout(() => {
                setCartMessage(false);
            }, 4000);

            fetchUserCart();

        } catch (error) {
            const errorMessage = error.message;
            setError(errorMessage);
            navigate("/sign-up");
        }
    };

    const isProductInCart = (product_id) => {
        return userCart.some(item => item.product_id === product_id);
    };

    const itemToShow = showAll ? products : products.slice(0, 8);
    const hasMoreItems = products.length > 8;

    return (
        <div className="min-h-screen flex flex-col items-center px-3 sm:px-5 md:px-6 py-6 sm:py-8 mt-16 sm:mt-20">

            <div className="w-full max-w-7xl">

                <button
                    className="mb-5 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200 text-sm sm:text-base"
                    onClick={() => navigate(-1)}
                >
                    &larr; Back
                </button>

                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-green-500 text-center sm:text-left">
                    Women's Fashion
                </h2>

                {cartMessage && (
                    <p className="text-green-600 bg-green-100 rounded-lg px-3 py-3 mb-5 text-sm sm:text-base">
                        Product Added successfully
                    </p>
                )}

                {error && (
                    <p className="text-red-500 bg-red-100 rounded-lg px-3 py-3 mb-5 text-sm sm:text-base break-words">
                        {error}
                    </p>
                )}

                {products.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 w-full transition-all duration-500">

                        {itemToShow.map((item, idx) => (
                            <div
                                key={item._id || idx}
                                className="min-w-0 p-3 sm:p-4 rounded-2xl border border-gray-100 hover:shadow-xl transition duration-200"
                                onMouseEnter={() => setIsHoveredIndex(idx)}
                                onMouseLeave={() => setIsHoveredIndex(null)}
                            >

                                <div className="relative w-full h-60 sm:h-64 md:h-64 lg:h-72 overflow-hidden rounded-lg mb-3">

                                    <img
                                        src={`${BACKEND_URL}/${item.image}`}
                                        alt={item.product_name}
                                        className="w-full h-full object-cover hover:scale-105 transition duration-200"
                                    />

                                    <button
                                        type="button"
                                        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-red-100 transition"
                                        aria-label="Add to wishlist"
                                    >
                                        <FaHeart className="text-red-500" />
                                    </button>

                                </div>

                                <p className="text-sm sm:text-[15px] text-gray-600 break-words">
                                    Name: {item.product_name}
                                </p>

                                <p className="text-sm sm:text-[15px] text-gray-600 mt-1 break-words">
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

                                <p className="text-center text-sm sm:text-base text-gray-600 font-bold mt-3">
                                    ${item.price}
                                </p>

                                <div className={`flex justify-center mt-4 sm:mt-5 ${
                                    isHoveredIndex === idx
                                        ? "opacity-100"
                                        : "opacity-100 sm:opacity-0"
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

                {hasMoreItems && !showAll && (
                    <div className="flex justify-center">
                        <button
                            onClick={() => setShowAll(true)}
                            className="w-full sm:w-auto mb-5 mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:shadow-xl hover:bg-green-600 transition duration-200 text-sm sm:text-base"
                        >
                            View All
                        </button>
                    </div>
                )}

                {showAll && (
                    <div className="flex justify-center">
                        <button
                            className="w-full sm:w-auto mb-8 mt-6 py-3 px-6 bg-green-500 text-white rounded-lg hover:shadow-xl hover:bg-green-600 transition duration-200 text-sm sm:text-base"
                            onClick={() => setShowAll(false)}
                        >
                            View Less
                        </button>
                    </div>
                )}

                {products.length === 0 && !error && (
                    <p className="text-center mt-10 text-gray-500 text-sm sm:text-base">
                        No Women's fashion found.
                    </p>
                )}

            </div>
        </div>
    );
};

export default WomenFashion;