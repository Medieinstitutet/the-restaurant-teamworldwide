import axios from "axios";
import { IReceivedBookings } from "../models/Booking";

export const checkForAvailability = (
  selectedDateFormatted: string,
  allBookings: IReceivedBookings[]
) => {

  console.log(selectedDateFormatted);
  const bookingsOnSelectedDate: IReceivedBookings[] = [];
  allBookings.map((booking) => {
    if (booking.date.toString() === selectedDateFormatted)
      bookingsOnSelectedDate.push(booking);
  });

  console.log(bookingsOnSelectedDate.length)

  const bookingsAt18OnSelectedDate = bookingsOnSelectedDate.filter(
    (booking) => booking.time === "18:00"
  );

  const bookingsAt21OnSelectedDate = bookingsOnSelectedDate.filter(
    (booking) => booking.time === "21:00"
  );
  return [bookingsAt18OnSelectedDate, bookingsAt21OnSelectedDate]
};
