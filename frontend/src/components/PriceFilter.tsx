type PriceFilterProps = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: PriceFilterProps) => {
  return (
    <div>
      <h4 className="text0md font-semibold mb-2">Max Price</h4>
      <select
        className="p-2 border rounded-md w-full"
        value={selectedPrice}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      >
        <option value="">Select Max Price</option>
        {[50, 100, 200, 300, 500].map((price, idx: number) => (
          <option value={price} key={idx++}>
            {price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
