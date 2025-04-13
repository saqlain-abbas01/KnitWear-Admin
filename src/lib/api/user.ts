import api from "./axios";

export const fetchUser = async () => {
  try {
    const response = await api.get("/user");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async ({ id }: { id: string }) => {
  try {
    const response = await api.delete(`/user/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
