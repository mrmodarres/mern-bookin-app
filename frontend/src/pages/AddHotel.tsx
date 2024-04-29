import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

function AddHotel() {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: async () => {
      showToast({ type: "SUCESS", message: "Hotel saved" });
      console.timeEnd("addhotel");
    },
    onError: async () => {
      showToast({ type: "ERROR", message: "Error Saving Hotel" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    console.time("addhotel");
    mutate(hotelFormData);
  };
  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
}

export default AddHotel;
