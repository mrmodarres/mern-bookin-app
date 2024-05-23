import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import { HotelType } from "../../../backend/src/shared/types";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";
function Search() {
  const search = useSearchContext();
  const [page, setPage] = useState<Number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelType, setSelectedHotelType] = useState<string[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number>();
  const [sortOption, setSortOption] = useState<string>("");
  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn,
    checkOut: search.checkOut,
    adultCount: search.adultCount,
    childCount: search.childCount,
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelType,
    facilities: selectedFacility,
    maxPrice: selectedPrice ? selectedPrice.toString() : "",
    sortOption: sortOption ? sortOption.toString() : "",
  };
  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );
  const handleStarChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = ev.target.value;
    setSelectedStars((prevStars) =>
      ev.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };
  const handleHotelType = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const hotelType = ev.target.value;
    setSelectedHotelType((prevType) =>
      ev.target.checked
        ? [...prevType, hotelType]
        : prevType.filter((type) => type !== hotelType)
    );
  };
  const handleFacilitiesType = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const hotelFacility = ev.target.value;
    setSelectedFacility((prevFacility) =>
      ev.target.checked
        ? [...prevFacility, hotelFacility]
        : prevFacility.filter((faiclity) => faiclity !== hotelFacility)
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky  top-1">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          {/* Todo Filters */}
          <StarRatingFilter
            selected={selectedStars}
            onChange={handleStarChange}
          />
          <HotelTypesFilter
            selected={selectedHotelType}
            onChange={handleHotelType}
          />
          <FacilitiesFilter
            selected={selectedFacility}
            onChange={handleFacilitiesType}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.totalHotels} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (low to high){" "}
            </option>
            <option value="pricePerNightDesc">
              Price Per Night (high to low)
            </option>
          </select>
        </div>
        {hotelData?.data.map((hotel: HotelType) => (
          <SearchResultCard key={hotel._id} hotel={hotel} />
        ))}
        <div>
          <Pagination
            currentPage={hotelData?.pagination.page || 1}
            totalPages={hotelData?.pagination.pages || 1}
            handlePageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
