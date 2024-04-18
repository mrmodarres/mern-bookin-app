import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormType } from "../../tying";
function TypeSection() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormType>();
  const watchType = watch("type");
  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label
            className={`cursor-pointer px-4 py-2 font-semibold text-sm rounded-full ${
              watchType === type ? "bg-blue-300" : "bg-gray-300"
            } hover:bg-blue-200 transition-all ease-linear`}
          >
            <input
              type="radio"
              value={type}
              {...register("type", {
                required: "This field required",
              })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
}

export default TypeSection;
