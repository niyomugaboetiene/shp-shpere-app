import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { searchProducts } from "./SearchApi";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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
            const res = await axios.get(`${BACKEND_URL}/user/userInfo`, { withCredentials: true });
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
            await axios.post(`${BACKEND_URL}/user/logout`, {}, { withCredentials: true });
            setUserInfo(null);
            navigate("/sign-up");
            alert('Logged out successfully');
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
        <div className="fixed top-0 left-0 w-full shadow-2xl z-50 bg-white px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
            <button
                className="text-xl sm:text-2xl font-bold text-green-500 whitespace-nowrap"
                onClick={() => navigate("/")}
            >
                Shop Sphere
            </button>

            <div className="hidden md:flex items-center space-x-4 lg:space-x-8 font-medium text-sm lg:text-base text-gray-700">
                <Link to="/" className="hover:underline transition-colors hover:text-green-500">
                    Home
                </Link>
                <Link to="/contact" className="hover:underline transition-colors hover:text-green-500">
                    Contact
                </Link>
                <Link to="/about" className="hover:underline transition-colors hover:text-green-500">
                    About
                </Link>
                <Link to="/sign-up" className="hover:underline transition-colors hover:text-green-500">
                    Sign Up
                </Link>
            </div>

            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
                <div className="flex items-center bg-gray-100 rounded-lg p-2 w-40 lg:w-64">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        placeholder="Search products..."
                        className="min-w-0 flex-1 bg-gray-100 outline-none px-1 lg:px-2 text-sm"
                    />
                    <FaSearch
                        onClick={handleSearch}
                        className="text-gray-600 cursor-pointer hover:text-gray-800 shrink-0"
                    />
                </div>

                <button
                    className="bg-white p-2 rounded-full cursor-pointer hover:bg-gray-200 transition"
                    onClick={() => navigate("/cart")}
                >
                    <FaShoppingCart className="text-gray-700" />
                </button>

                {loading && <p className="text-sm">Loading...</p>}

                {userInfo && (
                    <div className="relative">
                        <div
                            className="flex items-center space-x-2 cursor-pointer"
                            onClick={() => setIsMenuShown(!isMenuShow)}
                        >
                            <img
                                src={`${BACKEND_URL}/${userInfo.image}`}
                                alt={userInfo.user_name}
                                className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover"
                            />
                        </div>

                        {isMenuShow && (
                            <div className="absolute right-0 mt-2 w-56 sm:w-64 max-w-[90vw] bg-white shadow-lg rounded-lg px-4 sm:px-6 py-4 z-50">
                                <h1 className="text-lg sm:text-xl font-bold mb-3 text-green-500 underline text-center">
                                    User info
                                </h1>

                                <div className="flex justify-center">
                                    <img
                                        src={`${BACKEND_URL}/${userInfo.image}`}
                                        alt={userInfo.user_name}
                                        className="object-cover rounded-full w-24 h-24 sm:w-30 sm:h-30 mb-4 shadow-2xl transition duration-200 hover:translate-y-2 border-2 text-green-500"
                                    />
                                </div>

                                <p className="text-base sm:text-lg mb-2 text-center text-green-500 font-bold capitalize break-words">
                                    {userInfo.user_name}
                                </p>

                                <button
                                    onClick={Logout}
                                    className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm sm:text-base"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="md:hidden flex items-center shrink-0">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2"
                    aria-label="Toggle navigation menu"
                >
                    {isMobileMenuOpen ? (
                        <FaTimes className="text-xl sm:text-2xl text-gray-700" />
                    ) : (
                        <FaBars className="text-xl sm:text-2xl text-gray-700" />
                    )}
                </button>
            </div>

            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full max-h-[85vh] overflow-y-auto bg-white shadow-md flex flex-col items-center gap-5 sm:gap-6 py-5 sm:py-6 px-4 md:hidden z-40">
                    <div className="flex flex-col items-center gap-4 font-medium text-gray-700 text-sm sm:text-base">
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

                    <div className="flex items-center bg-gray-100 rounded-lg p-2 w-full max-w-sm">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch();
                                    setIsMobileMenuOpen(false);
                                }
                            }}
                            placeholder="Search products..."
                            className="min-w-0 flex-1 bg-gray-100 outline-none px-2 text-sm sm:text-base"
                        />
                        <FaSearch
                            onClick={() => {
                                handleSearch();
                                setIsMobileMenuOpen(false);
                            }}
                            className="text-gray-600 cursor-pointer hover:text-gray-800 shrink-0"
                        />
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <button
                            className="bg-white p-2 rounded-full cursor-pointer hover:bg-gray-200 transition"
                            onClick={() => {
                                navigate("/cart");
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            <FaShoppingCart className="text-gray-700 text-xl" />
                        </button>

                        {userInfo && (
                            <button
                                onClick={() => setIsMenuShown(!isMenuShow)}
                                className="flex items-center gap-2"
                            >
                                <img
                                    src={`${BACKEND_URL}/${userInfo.image}`}
                                    alt={userInfo.user_name}
                                    className="w-9 h-9 rounded-full object-cover"
                                />
                                <span className="text-sm font-medium text-green-500">
                                    {userInfo.user_name}
                                </span>
                            </button>
                        )}
                    </div>

                    {userInfo && isMenuShow && (
                        <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-4">
                            <h1 className="text-lg font-bold mb-3 text-green-500 underline text-center">
                                User info
                            </h1>

                            <div className="flex justify-center">
                                <img
                                    src={`${BACKEND_URL}/${userInfo.image}`}
                                    alt={userInfo.user_name}
                                    className="object-cover rounded-full w-24 h-24 mb-4 shadow-2xl border-2"
                                />
                            </div>

                            <p className="text-base mb-3 text-center text-green-500 font-bold capitalize">
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
    );
};

export default Navs;