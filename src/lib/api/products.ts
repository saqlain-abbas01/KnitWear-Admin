import api from "./axios";
import { z } from "zod";
import { formSchema } from "@/app/schema/createProductFormSchema";

export const fetchAllProducts = async () => {
  console.log("call fetch all products");
  const response = await api.get("/products");
  console.log("response products:", response.data);
  return response.data;
};

export const fetchRecentProducts = async () => {
  const response = await api.get("/products/recents");
  return response.data;
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
  console.log("edit product:", data, "id:", id);
  const response = await api.patch(`/products/${id}`, data);
  return response.data;
};

export const deleteProductById = async (id: string) => {
  try {
    const response = await api.delete(`/products/${id}`);
    console.log("deleted data:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
