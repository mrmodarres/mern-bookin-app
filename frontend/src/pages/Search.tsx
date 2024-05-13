import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import { HotelType } from "../../../backend/src/shared/types";
function Search() {
  const search = useSearchContext();
  const [page, setPage] = useState<Number>(1);
  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn,
    checkOut: search.checkOut,
    adultCount: search.adultCount,
    childCount: search.childCount,
    page: page.toString(),
  };
  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );
  console.log(hotelData);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          {/* Todo Filters */}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.totalHotels} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          {/* Todo Sort Options */}
        </div>
        {hotelData?.data.map((hotel: HotelType) => (
          <SearchResultCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default Search;
