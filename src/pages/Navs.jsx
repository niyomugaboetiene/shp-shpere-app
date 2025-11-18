import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { searchProducts } from "./SearchApi"; 

const Navs = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMenuShow, setIsMenuShown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

    const GetUserInfo = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:5000/user/userInfo", { withCredentials: true });
        setUserInfo(res.data.userInfo);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };
  useEffect(() => {
    GetUserInfo();
  }, []);

  const Logout = async () => {
    try {
      await axios.post("http://localhost:5000/user/logout", {}, { withCredentials: true });
      setUserInfo(null);
      navigate("/sign-up");
      alert('Logged out successfully')
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    try {
      const results = await searchProducts(searchTerm);
      navigate("/search", { state: { results } }); 
    } catch (err) {
      setError("Search failed");
    }
  };

  return (
   <div className="fixed top-0 left-0 w-full shadow-2xl z-50 bg-white px-6 py-4 flex items-center justify-between">
      <button
        className="text-2xl font-bold text-green-500"
        onClick={() => navigate("/")}
      >
        Shop Sphere
      </button>

      <div className="hidden md:flex space-x-8 font-medium text-gray-700">
        <Link to="/" onClick={() => setIsActive1(true)} className={`hover:underline transition-colors hover:text-green-500`}>
          Home
        </Link>
        <Link to="/contact"   className={`hover:underline transition-colors hover:text-green-500 `}>
          Contact
        </Link>
        <Link to="/about" className={`hover:underline transition-colors hover:text-green-500`}>
          About
        </Link>
        <Link to="/sign-up"  className={`hover:underline transition-colors hover:text-green-500`}>
          Sign Up
        </Link>
      </div>

      <div className="hidden md:flex items-center space-x-4 p-4">
        <div className="flex items-center bg-gray-100 rounded-lg p-2 w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="flex-1 bg-gray-100 outline-none px-2"
          />
          <FaSearch
            onClick={handleSearch}
            className="text-gray-600 cursor-pointer hover:text-gray-800"
          />
        </div>

        <button
          className="bg-white p-2 rounded-full cursor-pointer hover:bg-gray-200 transition"
          onClick={() => navigate("/cart")}
        >
          <FaShoppingCart className="text-gray-700" />
        </button>

        {loading && <p>Loading...</p>}

        {userInfo && (
          <div className="relative">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setIsMenuShown(!isMenuShow)}
            >
              <img
                src={`http://localhost:5000/${userInfo.image}`}
                alt={userInfo.user_name}
                className="w-10 h-10 rounded-full"
              />
            </div>

            {isMenuShow && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg px-6 py-4 z-50">
                <h1 className="text-xl font-bold mb-3 ms-13 text-green-500 underline">User info</h1>
                <div>
                  <img src={`http://localhost:5000/${userInfo.image}`} alt={userInfo.user_name} 
                     className="object-cover rounded-full w-30 h-30 ms-10 mb-4 shadow-2xl transition duration-200 hover:translate-y-2 border-2 text-green-500"
                   />
                </div>
                <p className="text-lg mb-2 text-center text-green-500 font-bold capitalize">
                  {userInfo.user_name}
                </p>
                <button
                  onClick={Logout}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="md:hidden flex items-center">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <FaTimes className="text-2xl text-gray-700" />
          ) : (
            <FaBars className="text-2xl text-gray-700" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-6 py-6 md:hidden z-40">
          <div className="flex flex-col space-y-4 font-medium text-gray-700">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-green-500">
              Home
            </Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-green-500">
              Contact
            </Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-green-500">
              About
            </Link>
            <Link to="/sign-up" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-green-500">
              Sign Up
            </Link>
          </div>

          <div className="flex items-center bg-gray-100 rounded-lg p-2 w-72">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="flex-1 bg-gray-100 outline-none px-2"
            />
            <FaSearch
              onClick={() => {
                handleSearch();
                setIsMobileMenuOpen(false);
              }}
              className="text-gray-600 cursor-pointer hover:text-gray-800"
            />
          </div>

          <button
            className="bg-white p-2 rounded-full cursor-pointer hover:bg-gray-200 transition"
            onClick={() => {
              navigate("/cart");
              setIsMobileMenuOpen(false);
            }}
          >
            <FaShoppingCart className="text-gray-700" />
          </button>
        </div>
      )}
    </div>
   );
};

export default Navs;
