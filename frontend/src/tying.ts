export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ToastMessageType = {
  message: string;
  type: "SUCESS" | "ERROR";
};

export type ToastType = ToastMessageType & {
  onClose: () => void;
};

export type SignInFormType = {
  email: string;
  password: string;
};

export type HotelFormType = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

export type SearchContextType = {
  destination: string;
  checkIn: string;
  checkOut: string;
  adultCount: number;
  childCount: number;
  hotelId: string;
  saveSearchValues: (
    destination: string,
    checkIn: string,
    checkOut: string,
    audltCount: number,
    childCount: number,
    hotelId?: string
  ) => void;
};
export type SearchContextProviderProps = {
  children: React.ReactNode;
};
