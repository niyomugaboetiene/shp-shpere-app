import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const UpdateProduct = () => {
    const [product_name, setProduct_name] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState("");
    const { product_id } = useParams();
    const [currentProduct, setCurrentProduct] = useState(null);
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const GetCurrentProduct = async () => {
            try {
                setIsFetching(true);

                const res = await axios.get(
                    `${BACKEND_URL}/product/getProduct/${product_id}`
                );

                const product = res.data.product;

                setCurrentProduct(product);
                setProduct_name(product.product_name || "");
                setPrice(product.price ?? "");
                setStock(product.stock ?? "");

            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to load product"
                );
            } finally {
                setIsFetching(false);
            }
        };

        GetCurrentProduct();
    }, [product_id]);

    const Update = async () => {
        try {
            setIsLoading(true);
            setError("");
            setSuccess("");

            const formData = new FormData();

            formData.append("product_name", product_name);
            formData.append("price", price);
            formData.append("stock", stock);

            if (image) {
                formData.append("image", image);
            }

            await axios.put(
                `${BACKEND_URL}/product/update/${product_id}`,
                formData,
                {
                    withCredentials: true,
                }
            );

            setSuccess("Updated successfully");

            setTimeout(() => {
                navigate("/");
            }, 1500);

        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Failed to update product";

            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-3 sm:px-5 md:px-6 py-8 sm:py-10 mt-12 sm:mt-16">

            <div className="w-full max-w-xl">

                <h1 className="text-center mt-6 sm:mt-8 text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10">
                    Update Product
                </h1>

                <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 w-full transition-all duration-300">

                    {isFetching ? (
                        <div className="py-12 text-center">
                            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-500 text-sm sm:text-base">
                                Loading product details...
                            </p>
                        </div>
                    ) : currentProduct ? (
                        <>

                            <div className="mb-6">
                                <label className="block text-sm sm:text-[15px] text-gray-600 mb-2">
                                    Enter new product name
                                </label>

                                <input
                                    type="text"
                                    value={product_name}
                                    onChange={(e) => setProduct_name(e.target.value)}
                                    className="w-full min-w-0 px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 text-sm sm:text-base"
                                    placeholder="Enter product name"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm sm:text-[15px] text-gray-600 mb-2">
                                    Enter new Price
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full min-w-0 px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 text-sm sm:text-base"
                                    placeholder="Enter product price"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm sm:text-[15px] text-gray-600 mb-2">
                                    Enter new Stock Number
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    className="w-full min-w-0 px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 text-sm sm:text-base"
                                    placeholder="Enter stock quantity"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm sm:text-[15px] text-gray-600 mb-2">
                                    Choose a new image (optional)
                                </label>

                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/jpg,image/webp"
                                    onChange={(e) => {
                                        const selectedFile = e.target.files[0];

                                        if (selectedFile && !selectedFile.type.startsWith("image/")) {
                                            setError("Please select a valid image file.");
                                            setImage(null);
                                            return;
                                        }

                                        setError("");
                                        setImage(selectedFile || null);
                                    }}
                                    className="w-full min-w-0 px-2 sm:px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 text-xs sm:text-sm"
                                />

                                {image && (
                                    <p className="text-xs sm:text-sm text-green-600 mt-2 break-all">
                                        Selected image: {image.name}
                                    </p>
                                )}
                            </div>

                            {currentProduct.image && (
                                <div className="mb-6">
                                    <p className="text-sm text-gray-600 mb-2">
                                        Current product image:
                                    </p>

                                    <img
                                        src={`${BACKEND_URL}/${currentProduct.image}`}
                                        alt={currentProduct.product_name}
                                        className="w-full h-40 sm:h-48 object-cover rounded-lg border border-gray-200"
                                    />
                                </div>
                            )}

                            <button
                                onClick={Update}
                                disabled={isLoading || !product_name.trim() || price === "" || stock === ""}
                                className="w-full bg-green-500 hover:bg-green-600 px-4 sm:px-6 py-3 rounded-lg text-white hover:shadow-lg transition duration-200 disabled:bg-green-300 disabled:cursor-not-allowed text-sm sm:text-base font-medium"
                            >
                                {isLoading ? "Updating..." : "Update Product"}
                            </button>

                        </>
                    ) : (
                        <p className="text-center text-gray-500 py-8">
                            Product not found.
                        </p>
                    )}

                    {error && (
                        <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm sm:text-base break-words">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mt-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm sm:text-base">
                            {success}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;