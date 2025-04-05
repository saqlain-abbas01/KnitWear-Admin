import { Product } from "@/app/types/types";
import api from "./axios";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products/recents");
  return response.data.recentProducts;
};

export const fetchProductsCount = async () => {
  const response = await api.get("/products");
  console.log("response from count", response.headers);
  const totalCount = response.headers["x-total-count"];
  return totalCount;
};
