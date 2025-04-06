import api from "./axios";

export const fetchAllOrders = async () => {
  console.log("call fetch all products");
  const response = await api.get("/orders");
  console.log("response orders:", response.data);
  return response.data;
};
