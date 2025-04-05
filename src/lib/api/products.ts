import api from "./axios";

export const fetchProducts = async () => {
  console.log("call api:", api);
  const response = await api.get("/products");
  console.log("products", response.data);
  return response.data;
};
