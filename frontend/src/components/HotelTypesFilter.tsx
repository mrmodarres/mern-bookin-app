import { hotelTypes } from "../config/hotel-options-config";

type HotelTypesProps = {
  selected: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypesFilter = ({ selected, onChange }: HotelTypesProps) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
      {hotelTypes.map((type, idx: number) => (
        <label key={idx++} className="flex items-center mb-2 space-x-2">
          <input
            type="checkbox"
            checked={selected.includes(type)}
            onChange={onChange}
            value={type}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <span className="text-sm text-gray-700">{type}</span>
        </label>
      ))}
    </div>
  );
};

export default HotelTypesFilter;
