import { Product } from "@/app/types/types";
import api from "./axios";
import { z } from "zod";
import { formSchema } from "@/app/schema/createProductFormSchema";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products/recents");
  return response.data.recentProducts;
};

export const fetchProductsById = async (id: string) => {
  console.log("fecth product by id:", id);
  const response = await api.get(`/products/${id}`);
  console.log("product:", response.data);
  return response.data.product as z.infer<typeof formSchema>;
};

export const fetchProductsCount = async () => {
  const response = await api.get("/products");
  console.log("response from count", response.headers);
  const totalCount = response.headers["x-total-count"];
  return totalCount;
};

export const createProduct = async (data: z.infer<typeof formSchema>) => {
  try {
    console.log("product to create:", data);
    const response = await api.post("/products", data);
    console.log("response data");
    return response.data as z.infer<typeof formSchema>;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async ({
  id,
  data,
}: {
  id: string;
  data: z.infer<typeof formSchema>;
}) => {
  console.log("edit product:", data);
  const response = await api.put(`/products/${id}`, data);
  return response.data;
};
