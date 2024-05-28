import React, { useContext, useState } from "react";
import { SearchContextProviderProps, SearchContextType } from "../tying";

const SearchContext = React.createContext<SearchContextType | undefined>(
  undefined
);

export const SearchProvider = ({ children }: SearchContextProviderProps) => {
  const [destination, setDestination] = useState<string>(
    () => sessionStorage.getItem("destination") || ""
  );
  const [checkIn, setCheckIn] = useState<string>(() =>
    new Date(sessionStorage.getItem("checkIn") || new Date()).toISOString()
  );
  const [checkOut, setCheckOut] = useState<string>(() =>
    new Date(sessionStorage.getItem("checkOut") || new Date()).toISOString()
  );
  const [adultCount, setAdultCount] = useState<number>(() =>
    parseInt(sessionStorage.getItem("adultCount") || "1")
  );
  const [childCount, setChildCount] = useState<number>(() =>
    parseInt(sessionStorage.getItem("childCount") || "0")
  );
  const [hotelId, setHotelId] = useState<string>(
    () => sessionStorage.getItem("hotelId") || ""
  );
  const saveSearchValues = (
    destination: string,
    checkIn: string,
    checkOut: string,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);
    if (hotelId) {
      setHotelId(hotelId);
      sessionStorage.setItem("hotelId", hotelId);
    }
    sessionStorage.setItem("destination", destination);
    sessionStorage.setItem("checkIn", checkIn);
    sessionStorage.setItem("checkOut", checkOut);
    sessionStorage.setItem("adultCount", adultCount.toString());
    sessionStorage.setItem("childCount", childCount.toString());
  };
  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        childCount,
        adultCount,
        saveSearchValues,
        hotelId,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as SearchContextType;
};
