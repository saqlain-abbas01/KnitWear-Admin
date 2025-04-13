import api from "./axios";

export const fetchAllOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

export const updateOrder = async ({
  id,
  data,
}: {
  id: string;
  data: { status: string };
}) => {
  try {
    const response = await api.put(`/orders/${id}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteOrder = async ({ id }: { id: string }) => {
  try {
    const response = await api.delete(`/orders/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
