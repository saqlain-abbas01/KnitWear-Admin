import { z } from "zod";
import api from "./axios";
import { formSchema } from "@/app/schema/createBrandFormSchema";

export const createBrand = async (data: z.infer<typeof formSchema>) => {
  try {
    const response = await api.post("/brands", data);
    return response.data as z.infer<typeof formSchema>;
  } catch (error) {
    throw error;
  }
};

export const fecthAllBrands = async () => {
  console.log("fecth brands from api..");
  try {
    const response = await api.get("/brands");
    console.log("brands response", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBrand = async ({
  id,
  data,
}: {
  id: string;
  data: z.infer<typeof formSchema>;
}) => {
  console.log("id", id, "data", data);
  const response = await api.put(`/brands/${id}`, data);
  return response.data;
};

export const deleteBrandById = async (id: string) => {
  try {
    const response = await api.delete(`/brands/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
