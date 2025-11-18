import { FaFacebook, FaInstagram, FaTwitter, FaTwitch, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-black text-white">
            <div className="mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-700 bg-clip-text text-transparent">
                        Shop Sphere
                    </h1>
                    <div className="space-y-3">
                        <input 
                            type="email" 
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 placeholder-gray-400" 
                            placeholder="Enter your email"
                        />
                        <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 font-medium shadow-lg">
                            Subscribe
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    <h1 className="text-xl font-semibold border-l-4 border-green-500 pl-3">Support</h1>
                    <div className="space-y-3 text-gray-300">
                        <p className="flex items-center space-x-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>RwandaMart in Rwanda</span>
                        </p>
                        <p className="flex items-center space-x-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>+250 728 184 299</span>
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <h1 className="text-xl font-semibold border-l-4 border-green-500 pl-4">Account</h1>
                    <div className="space-y-3 text-gray-300">
                        <Link className="block hover:text-green-500 hover:translate-x-2 transform duration-200 transition-all" to={'/updateProduct'}>
                            My Account
                        </Link>
                        <Link className="block hover:text-green-500 hover:translate-x-2 transform duration-200 transition-all" to="/sign-up">
                            Login/Register
                        </Link>
                        <Link className="block hover:text-green-500 hover:translate-x-2 transform duration-200 transition-all" to="/cart">
                            My Cart
                        </Link>
                    </div>
                </div>

                <div className="space-y-6">
                    <h1 className="text-xl font-semibold border-l-4 border-purple-500 pl-3">Quick Links</h1>
                    <div className="space-y-3 text-gray-300">
                        <Link className="block hover:text-green-500 hover:translate-x-2 transform duration-200 transition-all" to="/terms">
                            Terms of Use
                        </Link>
                        <Link className="block hover:text-green-500 hover:translate-x-2 transform duration-200 transition-all" to="/contact">
                            Contact Us
                        </Link>
                        <Link className="block hover:text-green-500 hover:translate-x-2 transform duration-200 transition-all" to="/about">
                            About Us
                        </Link>
                    </div>
                </div>

                <div className="space-y-6">
                    <h1 className="text-xl font-semibold border-l-4 border-red-500 pl-3">Let's Connect</h1>
                    <p className="text-gray-300 text-sm">
                        Follow us on social media for updates and promotions
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                        <Link className="p-3 bg-gray-800 rounded-lg hover:bg-green-600 hover:scale-110 transform duration-200 transition-all group w-15" to="https://www.facebook.com/profile.php?id=100090629463936" rel="noopener noreferer" target="_blank">
                            <FaFacebook className="text-xl group-hover:scale-110 ms-2 transform duration-200" />
                        </Link>
                        <Link className="p-3 bg-gray-800 rounded-lg hover:bg-pink-600 hover:scale-110 transform duration-200 transition-all group w-15" to="https://www.instagram.com/niyomugabo_etiene" rel="noopener noreferer" target="_blank">
                            <FaInstagram className="text-xl group-hover:scale-110 ms-2 transform duration-200" />
                        </Link>
                        <Link className="p-3 bg-gray-800 rounded-lg hover:bg-blue-400 hover:scale-110 transform duration-200 transition-all group w-15" to="https://x.com/Niyomugabo_250" rel="noopener noreferer" target="_blank">
                            <FaTwitter className="text-xl group-hover:scale-110 ms-2 transform duration-200" />
                        </Link>
                        <Link className="p-3 bg-gray-800 rounded-lg hover:bg-purple-600 hover:scale-110 transform duration-200 transition-all group w-15" to="https://www.twitch.tv/signup" rel="noopener noreferer" target="_blank">
                            <FaTwitch className="text-xl group-hover:scale-110 ms-2 transform duration-200" />
                        </Link>
                        <Link className="p-3 bg-gray-800 rounded-lg hover:bg-green-500 hover:scale-110 transform duration-200 transition-all group w-15" to="https://wa.me/+250728184299" rel="noopener noreferer" target="_blank">
                            <FaWhatsapp className="text-xl group-hover:scale-110  ms-2 transform duration-200" />
                        </Link>
                        <Link className="p-3 bg-gray-800 rounded-lg hover:bg-blue-700 hover:scale-110 transform duration-200 transition-all group w-15" to="https://www.linkedin.com" rel="noopener noreferer" target="_blank">
                            <FaLinkedinIn className="text-xl group-hover:scale-110 ms-2 transform duration-200" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700">
                <div className="max-w-7xl mx-auto px-6 py-4">
                        <p className="text-gray-400 text-sm text-center">
                            © 2025 Shop Sphere. All rights reserved.
                        </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;