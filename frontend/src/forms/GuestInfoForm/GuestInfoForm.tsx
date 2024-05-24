import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
type GuestInfoProps = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: string;
  checkOut: string;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: GuestInfoProps) => {
  const { isLoggedIn } = useAppContext();
  const search = useSearchContext();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });
  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate("/sign-in", { state: { from: location } });
  };
  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="text-md font-bold">${pricePerNight}</h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              selected={new Date(checkIn)}
              selectsStart
              onChange={(date: Date) =>
                setValue("checkIn", date?.toISOString().split("T")[0])
              }
              startDate={new Date(checkIn)}
              endDate={new Date(checkOut)}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full p-2 bg-white focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div>
            <DatePicker
              selected={new Date(checkOut)}
              selectsStart
              onChange={(date: Date) =>
                setValue("checkOut", date?.toISOString().split("T")[0])
              }
              startDate={new Date(checkOut)}
              endDate={new Date(checkOut)}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full p-2 bg-white focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div className="bg-white w-full flex px-2 py-1 gap-2">
            <label className="flex items-center w-full">
              Adults:
              <input
                type="number"
                className="w-full p-1 focus:outline-none font-bold"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is requierd",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            <label className="flex items-center w-full">
              Childs:
              <input
                type="number"
                className="w-full p-1 focus:outline-none font-bold"
                min={0}
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 fonnt-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>
          {isLoggedIn ? (
            <button className="bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500">
              Book now
            </button>
          ) : (
            <button className="bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500">
              Sign In to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
