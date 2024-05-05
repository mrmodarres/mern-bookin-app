import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
function EditHotel() {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const { data: hotel } = useQuery(
    "getMyHotelById",
    () => apiClient.getHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );
  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      showToast({ type: "SUCESS", message: "Hotel edited !" });
      queryClient.invalidateQueries("getMyHotelById");
    },
    onError: () => {
      showToast({ type: "ERROR", message: "Something went wrong!" });
    },
  });
  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm isLoading={isLoading} hotel={hotel} onSave={handleSave} />
  );
}

export default EditHotel;
