import { useState, useEffect } from "react";
import phone1 from "../assets/electrics/phone.webp";
import keyboard1 from "../assets/electrics/mouse.jpg";
import women1 from "../assets/clothes/women1.jpg";
import pent1 from "../assets/clothes/pent1.jpeg";
import pent2 from "../assets/clothes/pent2.jpeg";
import shoes1 from "../assets/clothes/shoes1.jpeg";
import shoes2 from "../assets/clothes/shoes3.jpeg";
import shoes3 from "../assets/clothes/shoes4.jpeg";
import clothes1 from "../assets/clothes/clothes1.jpg";
import clothes2 from "../assets/electrics/women1.webp";
import clothes3 from "../assets/clothes/clothes3.webp";
import { Link } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Images = [
    { image: phone1, description: "Modern phones for better price" },
    { image: keyboard1, description: "Modern mouse for better price" },
    { image: women1, description: "Women's Fashion" },
    { image: clothes1, description: "Women's Fahion" },
    { image: clothes2, description: "Women's Fashoin" },
    { image: clothes3, description: "Women's Fashoin" },
];

const recentlyViewed = [
    { image: pent1, description: "Modern phones for better price" },
    { image: pent2, description: "Modern keyboard for better price" },
    { image: shoes1, description: "Modern laptop for better price" },
    { image: shoes3, description: "Women's Fashion" },
    { image: shoes2, description: "Women's Fashion" }
];

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [recentIndex, setRecentIndex] = useState(0);
    const [isCurrentHovered, setIsCurrentHovered] = useState(false);
    const [isRecentHovered, setIsRecentHovered] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const fetchCurrentUser = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/user/userInfo`, {
                withCredentials: true,
            });
            setCurrentUser(res.data.userInfo);
        } catch (error) {
            console.log("Error fetching user info:", error.message);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === Images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setRecentIndex((prevIndex) =>
                prevIndex === recentlyViewed.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center px-3 sm:px-6 md:px-9 py-5 sm:py-6 mt-2 sm:mt-4 w-full max-w-7xl mx-auto min-w-0">

            {currentUser?.isAdmin && (
                <div className="self-end mb-4 sm:mb-6 w-full sm:w-auto">
                    <Link
                        to="/add"
                        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 px-5 sm:px-6 py-3 rounded-lg text-white hover:shadow-lg transition duration-200 text-sm sm:text-base"
                    >
                        <span>+</span> Add Product
                    </Link>
                </div>
            )}

            <div className="flex flex-col md:flex-row w-full gap-5 sm:gap-6 md:gap-8">

                <div className="w-full md:w-1/4 border-b-2 md:border-b-0 md:border-r-2 border-gray-200 pb-4 md:pb-0 pr-0 md:pr-6 min-w-0">

                    <div className="flex md:hidden justify-between items-center mb-4">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
                            Categories
                        </h2>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-green-500 font-semibold border border-green-500 px-3 py-2 rounded hover:bg-green-500 hover:text-white transition text-sm sm:text-base"
                        >
                            {isMenuOpen ? "Hide" : "Show"}
                        </button>
                    </div>

                    <nav
                        className={`flex flex-col space-y-2 overflow-hidden transition-all duration-500 ease-in-out ${
                            isMenuOpen ? "max-h-96" : "max-h-0 md:max-h-none"
                        } md:max-h-none md:space-y-0`}
                    >
                        <Link
                            to="women"
                            className="py-2 sm:py-3 hover:text-green-500 transition-colors text-base sm:text-lg font-medium"
                        >
                            Woman's Fashion
                        </Link>

                        <Link
                            to="men"
                            className="py-2 sm:py-3 hover:text-green-500 transition-colors text-base sm:text-lg font-medium"
                        >
                            Men's Fashion
                        </Link>

                        <Link
                            to="electronics"
                            className="py-2 sm:py-3 hover:text-green-500 transition-colors text-base sm:text-lg font-medium"
                        >
                            Electronics
                        </Link>

                        <Link
                            to="lifestyle"
                            className="py-2 sm:py-3 hover:text-green-500 transition-colors text-base sm:text-lg font-medium"
                        >
                            Home & Lifestyle
                        </Link>

                        <Link
                            to="toy"
                            className="py-2 sm:py-3 hover:text-green-500 transition-colors text-base sm:text-lg font-medium"
                        >
                            Baby's & Toys
                        </Link>

                        <Link
                            to="health"
                            className="py-2 sm:py-3 hover:text-green-500 transition-colors text-base sm:text-lg font-medium"
                        >
                            Health & Beauty
                        </Link>
                    </nav>
                </div>

                <div className="flex-1 flex justify-center md:justify-end w-full min-w-0">
                    <div className="relative max-w-3xl w-full min-w-0">

                        <div className="transition-opacity duration-500 ease-in-out">
                            <div className="aspect-video relative w-full overflow-hidden rounded-lg">
                                <img
                                    src={Images[currentIndex].image}
                                    alt={Images[currentIndex].description}
                                    className="w-full h-full object-cover rounded-lg shadow-lg hover:scale-105 transition duration-200"
                                />

                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 sm:p-4 rounded-b-lg">
                                    <p className="text-sm sm:text-lg font-medium text-center break-words">
                                        {Images[currentIndex].description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center mt-3 sm:mt-4 gap-2">
                            {Images.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
                                        index === currentIndex ? "bg-green-500" : "bg-gray-300"
                                    }`}
                                    onClick={() => setCurrentIndex(index)}
                                    aria-label={`Show image ${index + 1}`}
                                />
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;