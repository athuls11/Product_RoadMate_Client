import axios from "axios";

const BASE_URL = "https://product-roadmate-server.onrender.com/api";

const apiService = {
  createProduct: async (productData) => {
    return axios.post(`${BASE_URL}/product/create`, {
      name: productData,
    });
  },
  listProducts: async (search) => {
    return axios.get(`${BASE_URL}/product/list?term=${search}`);
  },
};

export default apiService;
