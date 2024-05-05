import axios from "axios";
import { HotelFormType, RegisterFormData, SignInFormType } from "./tying";
import { HotelType } from "../../backend/src/shared/types";
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

export const getMyHotels = async (): Promise<HotelType[]> => {
  const response = await axios(`${API_BASE_URL}/api/my-hotels`, {
    withCredentials: true,
    method: "get",
  });
  if (response.status !== 200) {
    throw new Error("Error fetching hotels");
  }

  return response.data;
};

export const getHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await axios(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    method: "get",
    withCredentials: true,
  });
  if (response.status !== 200) {
    throw new Error("Error fetching Hotels");
  }
  return response.data;
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await axios(
    `${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
    {
      method: "put",
      withCredentials: true,
      data: hotelFormData,
    }
  );
  if (response.status !== 201) {
    throw new Error("Failes to update Hotel");
  }
  return response.data;
};
