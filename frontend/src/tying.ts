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
