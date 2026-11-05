import { FaHome, FaArrowLeft, FaExclamationTriangle, FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">

      <section className="flex-1 flex items-center justify-center px-4 py-20 bg-gradient-to-br from-gray-50 to-white">

        <div className="max-w-4xl mx-auto text-center">

          <div className="relative flex justify-center mb-8">

            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
              <FaExclamationTriangle className="text-4xl text-green-500" />
            </div>

          </div>

          <h1 className="text-8xl md:text-[180px] font-black text-green-500 leading-none mb-4 tracking-tighter">
            404
          </h1>

          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
            Oops! Page Not Found
          </h2>

          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            The page you're looking for might have been removed,
            had its name changed, or is temporarily unavailable.
            Don't worry, let's get you back to shopping!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

            <button
              onClick={() => navigate("/")}
              className="w-full sm:w-auto px-8 py-4 bg-green-500 text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-green-600 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <FaHome />
              Back to Home
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-8 py-4 border-2 border-green-500 text-green-500 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-green-500 hover:text-white hover:-translate-y-1 transition-all duration-300"
            >
              <FaArrowLeft />
              Go Back
            </button>

          </div>

          <div className="mt-16 pt-8 border-t border-gray-200">

            <p className="text-gray-500 mb-5">
              Looking for something special?
            </p>

            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-green-500 font-bold hover:text-green-700 hover:gap-4 transition-all duration-300"
            >
              <FaShoppingBag />
              Explore ShopSphere
            </button>

          </div>

        </div>

      </section>
    </div>
  );
};

export default NotFound;