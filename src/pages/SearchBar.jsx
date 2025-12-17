import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaPlus } from "react-icons/fa";

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

  const AddToCart = async (product_id) => {
    try {
      await axios.post(
        `http://localhost:5000/product/cart/add/${product_id}`,
        { quality: 1 },
        { withCredentials: true }
      );
      setCartMessage(true);
      fetchUserCart(); 
    } catch (error) {
      setError(error.message);
      console.log("Add to cart error:", error.message);
      navigate('/sign-up')
    }
  };

  const isProductInCart = (product_id) => {
    return userCart.some((item) => item.product_id === product_id);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 mt-20">
      <button
        className="self-start mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </button>

      <h2 className="text-3xl font-bold mb-8 text-green-500">Search Results</h2>

      {products.length === 0 ? (
        <p className="text-gray-500 text-lg">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
          {products.map((item, idx) => (
            <div
              key={item._id || idx}
              className="p-4 rounded-2xl hover:shadow-xl transition duration-200"
              onMouseEnter={() => setIsHoveredIndex(idx)}
              onMouseLeave={() => setIsHoveredIndex(null)}
            >
              <div className="w-full h-72 overflow-hidden rounded-lg mb-3">
                <img
                  src={`http://localhost:5000/${item.image}`}
                  alt={item.product_name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-200"
                />
              </div>

              <p className="text-[15px] text-gray-600 font-medium">
                Name: {item.product_name}
              </p>
              <p className="text-[15px] text-gray-600">Category: {item.category}</p>

              <div className="flex justify-between mt-1">
                <p className="text-xs text-gray-600">
                  {new Date(item.date).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-600">Stock: {item.stock}</p>
              </div>

              <p className="text-center text-sm text-gray-800 font-bold mt-2">
                ${item.price}
              </p>

              {isHoveredIndex === idx && (
                <div className="flex justify-center mt-5">
                  <button onClick={() => AddToCart(item.product_id)}>
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
      )}

      {error && (
        <p className="text-red-500 mt-4 bg-red-100 px-3 py-2 rounded-md">
          {error}
        </p>
      )}
      {cartMessage && (
        <p className="text-green-600 mt-4 bg-green-100 px-3 py-2 rounded-md">
          Added to cart successfully!
        </p>
      )}
    </div>
  );
};

export default SearchResults;
