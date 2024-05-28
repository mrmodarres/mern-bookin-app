import axios from "axios";
import {
  BookingFormData,
  RegisterFormData,
  SearchParams,
  SignInFormType,
} from "./tying";
import {
  HotelSearchResponse,
  HotelType,
  PaymentIntentResponse,
  UserType,
} from "../../backend/src/shared/types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const getCurrentUser = async (): Promise<UserType> => {
  const response = await axios(`${API_BASE_URL}/api/users/me`, {
    withCredentials: true,
  });
  if (response.status !== 200) {
    throw new Error("Error fetching user");
  }
  return response.data;
};

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
    throw new Error("Failed to update Hotel");
  }
  return response.data;
};

export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {
  const response = await axios(`${API_BASE_URL}/api/hotels/search`, {
    method: "get",
    params: searchParams,
    paramsSerializer: (params) => {
      const parts = [];
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const value = params[key];
          if (Array.isArray(value)) {
            value.forEach((val) => {
              parts.push(
                `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
              );
            });
          } else {
            parts.push(`${encodeURIComponent(key)}=${value}`);
          }
        }
      }
      return parts.join("&");
    },
  });
  if (response.status !== 200) {
    throw new Error("Failed to search hotels");
  }

  return response.data;
};

export const getHotelDetailById = async (
  hotelId: string
): Promise<HotelType> => {
  const response = await axios(`${API_BASE_URL}/api/hotels/${hotelId}`, {
    method: "get",
  });
  if (response.status !== 200) {
    throw new Error("Error fetching Hotels");
  }
  return response.data;
};

export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: string
): Promise<PaymentIntentResponse> => {
  const response = await axios(
    `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
    {
      withCredentials: true,
      method: "post",
      data: {
        numberOfNights,
      },
    }
  );
  if (response.status !== 200) {
    throw new Error("Error fetching payment intent");
  }
  return response.data;
};

export const createRoomBooking = async (formData: BookingFormData) => {
  const response = await axios(
    `${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,
    {
      method: "post",
      data: formData,
      withCredentials: true,
    }
  );
  console.log(response);
  if (response.status !== 200) {
    throw new Error("Error booking room");
  }
};
