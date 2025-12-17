import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LastPage = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [cartMessage, setCartMessage] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/user/userInfo", {
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
      const res = await axios.get(`http://localhost:5000/product/getProduct/${product_id}`, {
        withCredentials: true,
      });
      setCurrentProduct(res.data.product);
    } catch (error) {
      console.log("Error fetching product:", error.message);
    }
  };
  fetchProducts();
}, []);

const AddToCart = async(product_id) => {
    try {
        await axios.post(`http://localhost:5000/product/cart/add/${product_id}`, { quality: 1 }, { withCredentials: true });
        setCartMessage(true);
        setTimeout(() => {
          setCartMessage("");
        }, 3000);

    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage);
      navigate('/sign-up')
    }
};



  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-black rounded-lg w-full max-w-7xl">
            {cartMessage && (
              <p className="text-green-500 text-center">Product Added successfully</p>
            )}     
           {cartMessage && (
                <p className="text-red-500 text-center">{error}</p>
            )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 relative">
          <img
            src={`http://localhost:5000/${currentProduct.image}`}
            alt="Speaker product"
            className="w-full max-w-[400px] mx-auto object-cover rounded-lg transition-transform duration-300 hover:scale-105"
          />

          {currentUser?.isAdmin && (
            <>   
             <button
              onClick={() => navigate(`/updates`)}
              className="absolute top-5 right-3 bg-yellow-500 hover:bg-yellow-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              title="Edit product"
            >
              <FaEdit className="text-xl text-center" />
            </button>
            </>

          )}

          <div className="flex flex-col justify-center items-center text-center">
            <p className="text-2xl text-white font-bold mb-8">
              Enhance your music experience by clicking to buy now button
            </p>
            <button 
                className="bg-green-500 py-3 px-6 text-white rounded-lg transition duration-200 hover:bg-green-600 hover:scale-105"
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
