import { useForm } from "react-hook-form";
import {
  PaymentIntentResponse,
  UserType,
} from "../../../../backend/src/shared/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { BookingFormData } from "../../tying";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";
type BookingFormProps = {
  currensUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

const BookingForm = ({ currensUser, paymentIntent }: BookingFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const search = useSearchContext();
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  const { mutate: bookRoom, isLoading } = useMutation(
    apiClient.createRoomBooking,
    {
      onSuccess: () => {
        showToast({ message: "Booking Saved!", type: "SUCESS" });
      },
      onError: () => {
        showToast({ message: "Error saving booking", type: "ERROR" });
      },
    }
  );

  const { register, handleSubmit } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currensUser.firstName,
      lastName: currensUser.lastName,
      email: currensUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      hotelId: hotelId,
      paymentIntentId: paymentIntent.paymentIntentId,
      totalCost: paymentIntent.totalCost,
    },
  });
  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });
    if (result.paymentIntent?.status === "succeeded") {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
    >
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            type="text"
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            type="text"
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            type="text"
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>
        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: ${paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        />
      </div>
      <div className="flex justify-end">
        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-base disabled:bg-gray-500 "
        >
          {isLoading ? "Saving..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
