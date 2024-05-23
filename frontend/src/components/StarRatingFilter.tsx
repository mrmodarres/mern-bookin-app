type StarRatingProps = {
  selected: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({ selected, onChange }: StarRatingProps) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Property Rating</h4>
      {["5", "4", "3", "2", "1"].map((rating) => (
        <label key={rating} className="flex items-center mb-2 space-x-2">
          <input
            type="checkbox"
            checked={selected.includes(rating)}
            onChange={onChange}
            value={rating}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <span className="text-sm text-gray-700">{rating} Stars</span>
        </label>
      ))}
    </div>
  );
};

export default StarRatingFilter;
