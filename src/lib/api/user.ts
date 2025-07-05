import api from "./axios";

export type CreateUser = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: string;
};

export const createUser = async (data: CreateUser) => {
  console.log("user to create", data);
  const response = await api.post("/auth/signUp", data);
  console.log("created User", response.data);
  return response.data;
};

export const authUser = async (data: any) => {
  try {
    const response = await api.post("/auth/adminSignIn", data, {
      withCredentials: true,
    });
    console.log("auth User api response:", response.data);
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const fetchUser = async () => {
  try {
    const response = await api.get("/user");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserProfile = async () => {
  try {
    console.log("fetching user profile");
    const response = await api.get("/user/profile", {
      withCredentials: true,
    });
    console.log("profile data", response.data);
    return response.data;
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

export const userLogout = async () => {
  console.log("call logout");
  try {
    const response = await api.post(`user/logout`, null, {
      withCredentials: true,
    });
    console.log("response update data", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
