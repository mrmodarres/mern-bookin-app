import mongoose from "mongoose";

// put all type in new file
export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  ficilites: string[];
  pricePerNight: number;
  starRaiting: number;
  imageUrls: string[];
  lastUpdated: Date;
};

const hotelSchema = new mongoose.Schema<HotelType>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  ficilites: [{ type: String, required: true }],
  pricePerNight: { type: Number, required: true },
  starRaiting: { type: Number, required: true, min: 1, max: 5 },
  imageUrls: [{ type: String, required: Number }],
  lastUpdated: { type: Date, required: true },
});

const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema);

export default Hotel;
