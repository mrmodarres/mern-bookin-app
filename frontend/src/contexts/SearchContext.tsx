import React, { useContext, useState } from "react";
import { SearchContextProviderProps, SearchContextType } from "../tying";

const SearchContext = React.createContext<SearchContextType | undefined>(
  undefined
);

export const SearchProvider = ({ children }: SearchContextProviderProps) => {
  const [destination, setDestination] = useState<string>("");
  const [checkIn, setCheckIn] = useState<string>(new Date().toISOString());
  const [checkOut, setCheckOut] = useState<string>(new Date().toISOString());
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
  const [hotelId, setHotelId] = useState<string>("");
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
    }
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
