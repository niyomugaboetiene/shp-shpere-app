import axios from "axios";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
                const product = await axios.get('http://localhost:5000/product/men', { withCredentials: true });
                setProducts(product.data.MenProduct);
            } catch (error) {
                console.log("ERROR: ", error.message);
            }
        };
        GetNewProducts();
    }, []);

    const AddToCart = async(product_id) => {
        try {
            setIsLoading(true);
            await axios.post(`http://localhost:5000/product/cart/add/${product_id}`, { quality: 1 }, { withCredentials: true });
            setCartMessage(true);
            await fetchUserCart();
            
            setTimeout(() => {
                setCartMessage(false);
            }, 2000);
        } catch (error) {
            const errorMessage = error.message;
            setError(errorMessage);
            navigate('/sign-up')
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUserCart = async () => {
        try {
            const res = await axios.get("http://localhost:5000/product/cart", {
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
        <div className="flex flex-col items-center justify-center p-6">
            {cartMessage && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                    Product added to cart successfully!
                </div>
            )}

            {error && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                    {error}
                </div>
            )}

            <button
                className="self-start mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                onClick={() => navigate(-1)}
            >
                &larr; Back
            </button>

            <h2 className="text-3xl font-bold mb-8 text-green-500">Men's Fashion</h2>
          {cartMessage && (
              <p className="text-green-500">Product Added successfully</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl transition-all duration-500">
                {itemToShow.map((item, idx) => (
                    <div
                        key={idx}
                        className="p-4 rounded-2xl hover:shadow-xl transition duration-200"
                        onMouseEnter={() => setIsHoveredIndex(idx)}
                        onMouseLeave={() => setIsHoveredIndex(null)}
                    >
                        <div className="relative w-full h-72 overflow-hidden rounded-lg mb-3">
                            <img
                                src={`http://localhost:5000/${item.image}`}
                                className="w-full h-full object-cover hover:scale-105 transition duration-200"
                            />
                        </div>

                        <p className="text-[15px] text-gray-600">Name: {item.product_name}</p>
                        <p className="text-[15px] text-gray-600">Category: {item.category}</p>

                        <div className="flex justify-between">
                            <p className="text-center text-xs text-gray-600">{new Date(item.date).toLocaleDateString()}</p>
                            <p className="text-center text-xs text-gray-600">Stock: {item.stock}</p>
                        </div>

                        <p className="text-center text-sm text-gray-600 font-bold">${item.price}</p>

                        {isHoveredIndex === idx && (
                            <div className="flex justify-center mt-5">
                                <button 
                                    onClick={() => AddToCart(item.product_id)} 
                                    disabled={isLoading}
                                >
                                    {isProductInCart(item.product_id) ? (
                                        <div className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-lg text-white hover:bg-green-600 transition">
                                            <FaPlus /> Increase Quantity
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-lg text-white hover:bg-green-600 transition">
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
                    className="mb-5 mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:shadow-xl hover:bg-green-600 transition duration-200"
                >
                    View All
                </button>
            )}
            {showAll && (
                <button
                    onClick={() => setShowAll(false)}
                    className="mb-8 py-3 px-6 bg-green-500 text-white rounded-lg hover:shadow-xl hover:bg-green-600 transition duration-200"
                >
                    View Less
                </button>
            )}

            {products.length === 0 && (
                <p className="text-center mt-10 text-gray-500">No Men's fashion found.</p>
            )}
        </div>
    );
};

export default MenFashion;