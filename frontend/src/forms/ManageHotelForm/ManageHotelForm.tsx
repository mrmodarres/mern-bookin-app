import { FormProvider, useForm } from "react-hook-form";
import { HotelFormType } from "../../tying";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

type Props = {
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
  hotel?: HotelType;
  title?: string;
};

function ManageHotelForm({
  onSave,
  isLoading,
  hotel,
  title = "Add Hotel",
}: Props) {
  const formMethods = useForm<HotelFormType>();
  const { handleSubmit, reset } = formMethods;
  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formDataJson: HotelFormType) => {
    // create a new formdata object & call our api
    const formData = new FormData();
    if (hotel) {
      formData.append("hotelId", hotel._id);
    }
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });
    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, idx) => {
        formData.append(`imageUrls[${idx}]`, url);
      });
    }
    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });
    onSave(formData);
  });
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection title={title} />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
          >
            {isLoading ? "Saving ..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
}

export default ManageHotelForm;
