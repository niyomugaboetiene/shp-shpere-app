import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:5000/product/cart", {
          withCredentials: true,
        });
        setCartItems(res.data.cart);
      } catch (err) {
        console.error(err);
        setError("Login First to exprole your cart");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (product_id) => {
    try {
      await axios.post(
        "http://localhost:5000/product/cart/remove",
        { product_id },
        { withCredentials: true }
      );
      setCartItems((prev) => prev.filter((item) => item.product_id !== product_id));
    } catch (err) {
      console.error(err);
      setError("Failed to remove item");
    }
  };

  const updateQuantity = async (product_id, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      await axios.put(
        `http://localhost:5000/product/updates/${product_id}`,
        { quality: newQuantity },
        { withCredentials: true }
      );
      setCartItems(prev => 
        prev.map(item => 
          item.product_id === product_id 
            ? { ...item, quality: newQuantity }
            : item
        )
      );
    } catch (err) {
      console.error(err);
      setError("Failed to update quantity");
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quality, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quality, 0);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
        <p className="text-red-600 text-center">{error}</p>
      </div>
    </div>
  );

  if (cartItems.length === 0) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <FaShoppingBag className="mx-auto text-6xl text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-600 mb-2">Your cart is empty</h2>
        <p className="text-gray-500">Start shopping to add items to your cart</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
          <p className="text-lg text-gray-600">Review and manage your items</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold">
            <div className="col-span-5">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-1 text-center">Total</div>
            <div className="col-span-1 text-center">Action</div>
          </div>

          <div className="divide-y divide-gray-100">
            {cartItems.map((item) => (
              <div key={item.product_id} className="grid grid-cols-12 gap-4 items-center px-6 py-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="col-span-5 flex items-center space-x-4">
                  <img
                    src={`http://localhost:5000/${item.image}`}
                    alt={item.product_name}
                    className="w-20 h-20 object-cover rounded-xl shadow-md"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{item.product_name}</h3>
                    <p className="text-gray-500 text-sm capitalize">{item.category}</p>
                  </div>
                </div>

                <div className="col-span-2 text-center">
                  <span className="text-xl font-bold text-gray-900">${item.price}</span>
                </div>

                <div className="col-span-3 flex justify-center">
                  <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-2">
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quality - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors"
                    >
                      <FaMinus className="text-gray-600 text-xs" />
                    </button>
                    <span className="font-semibold text-gray-900 min-w-8 text-center">{item.quality}</span>
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quality + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors"
                    >
                      <FaPlus className="text-gray-600 text-xs" />
                    </button>
                  </div>
                </div>

                <div className="col-span-1 text-center">
                  <span className="text-lg font-bold text-green-600">
                    ${(item.price * item.quality).toFixed(2)}
                  </span>
                </div>

                <div className="col-span-1 flex justify-center">
                  <button
                    onClick={() => removeFromCart(item.product_id)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors duration-200 group"
                    title="Remove item"
                  >
                    <FaTrash className="text-sm group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 px-6 py-8">
            <div className="flex justify-between items-center">
              <div className="text-gray-600">
                <p className="text-lg">Total items: <span className="font-semibold">{totalItems}</span></p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  Total: <span className="text-green-600">${totalPrice.toFixed(2)}</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">Shipping calculated at checkout</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-6 border-t border-gray-200">
            <div className="flex justify-end space-x-4">
              <button onClick={() => navigate("/")} className="px-8 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition-colors duration-200 font-semibold">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;