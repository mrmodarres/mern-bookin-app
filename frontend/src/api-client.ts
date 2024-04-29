import axios from "axios";
import { RegisterFormData, SignInFormType } from "./tying";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const registerApi = async (formData: RegisterFormData) => {
  const request = await axios(`${API_BASE_URL}/api/users/register`, {
    method: "post",
    withCredentials: true,
    data: formData,
  });
  const response = await request.data;
  if (request.status !== 200) {
    throw new Error(response.message);
  }
};

export const signIn = async (loginData: SignInFormType) => {
  const response = await axios(`${API_BASE_URL}/api/auth/login`, {
    method: "post",
    data: loginData,
    withCredentials: true,
  });
  const data = await response.data;
  if (response.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export const validateToken = async () => {
  const response = await axios(`${API_BASE_URL}/api/auth/validate-token`, {
    withCredentials: true,
  });

  if (response.status !== 200) {
    throw new Error("Token invalid");
  }
  return response.data;
};

export const signOut = async () => {
  const response = await axios(`${API_BASE_URL}/api/auth/logout`, {
    method: "post",
    withCredentials: true,
  });
  if (response.status !== 200) {
    throw new Error("Somthing went wrong");
  }
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await axios(`${API_BASE_URL}/api/my-hotels`, {
    method: "post",
    withCredentials: true,
    data: hotelFormData,
  });
  if (response.status !== 201) {
    throw new Error("Failed to add hotel");
  }

  return response.data;
};
