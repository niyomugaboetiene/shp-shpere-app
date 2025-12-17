import axios from "axios";

const BASE_URL = import.meta.env.BACKEND_URL;

export const searchProducts = async (query, category = "") => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: { query, category },
      withCredentials: true,
    });
    return response.data.products;
  } catch (error) {
    console.error("Search failed:", error.message);
    throw error;
  }
};
