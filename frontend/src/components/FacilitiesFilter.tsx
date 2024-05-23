import { hotelFacilities } from "../config/hotel-options-config";

type FacilitiesFilterProps = {
  selected: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({ selected, onChange }: FacilitiesFilterProps) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Facilities</h4>
      {hotelFacilities.map((facilitiy) => (
        <label key={facilitiy} className="flex items-center mb-2 space-x-2">
          <input
            type="checkbox"
            checked={selected.includes(facilitiy)}
            onChange={onChange}
            value={facilitiy}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <span className="text-sm text-gray-700">{facilitiy}</span>
        </label>
      ))}
    </div>
  );
};

export default FacilitiesFilter;
