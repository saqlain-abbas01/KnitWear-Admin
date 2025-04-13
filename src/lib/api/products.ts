import api from "./axios";
import { z } from "zod";
import { formSchema } from "@/app/schema/createProductFormSchema";

export const fetchAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const fetchRecentProducts = async () => {
  const response = await api.get("/products/recents");
  return response.data;
};

export const fetchProductsById = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data.product as z.infer<typeof formSchema>;
};

export const fetchProductsCount = async () => {
  const response = await api.get("/products");
  const totalCount = response.headers["x-total-count"];
  return totalCount;
};

export const createProduct = async (data: z.infer<typeof formSchema>) => {
  try {
    const response = await api.post("/products", data);
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
  const response = await api.patch(`/products/${id}`, data);
  return response.data;
};

export const deleteProductById = async (id: string) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
