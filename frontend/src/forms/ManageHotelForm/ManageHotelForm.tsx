import { FormProvider, useForm } from "react-hook-form";
import { HotelFormType } from "../../tying";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";

function ManageHotelForm() {
  const formMethods = useForm<HotelFormType>();

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10">
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
          >
            Save
          </button>
        </span>
      </form>
    </FormProvider>
  );
}

export default ManageHotelForm;
