import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
function SearchBar() {
  const navigate = useNavigate();
  const search = useSearchContext();
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<string>(search.checkIn);
  const [checkOut, setCheckOut] = useState<string>(search.checkOut);
  const [childCount, setChildCount] = useState<number>(search.childCount);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getUTCFullYear() + 1);
  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 items-center gap-4"
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          type="text"
          placeholder="Where you to?"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
          className="w-full text-sm focus:outline-none "
        />
      </div>
      <div className="bg-white w-full flex px-2 py-1 gap-2">
        <label className="items-center flex">
          Adults:
          <input
            type="number"
            className="w-full p-1 focus:outline-none font-bold"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="items-center flex">
          Childs:
          <input
            type="number"
            className="w-full p-1 focus:outline-none font-bold"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>
      <div>
        <DatePicker
          selected={new Date(checkIn)}
          selectsStart
          onChange={(date: Date) =>
            setCheckIn(date?.toISOString().split("T")[0])
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
            setCheckOut(date?.toISOString().split("T")[0])
          }
          startDate={new Date(checkIn)}
          endDate={new Date(checkOut)}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="min-w-full p-2 bg-white focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex gap-1">
        <button className="w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500">
          Search
        </button>
        <button className="w-1/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500">
          Clear
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
