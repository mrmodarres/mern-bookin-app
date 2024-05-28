import { HotelType } from "../../../backend/src/shared/types";

type SummaryProps = {
  checkIn: string;
  checkOut: string;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
}: SummaryProps) => {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit ">
      <h2 className="text-xl font-bold">Your Booking Details</h2>
      <div className="border-b py-2">
        Location:
        <span className="font-bold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</span>
      </div>
      <div className="flex justify-between">
        <div>
          Check-in
          <div className="font-bold">{new Date(checkIn).toDateString()}</div>
        </div>
        <div>
          Check-out
          <div className="font-bold">{new Date(checkOut).toDateString()}</div>
        </div>
      </div>
      <div className="border-t border-b py-2">
        Total length of stay:
        <div className="font-bold">{numberOfNights} nights</div>
      </div>
      <div>
        Guest{" "}
        <div className="font-bold">
          {adultCount} aduls & {childCount} children
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
