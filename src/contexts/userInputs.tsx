import { createContext } from "react";
import { NewBooking } from "../models/Booking";

export interface IUserInputContext {
    newBooking: NewBooking,
    addBookingDetails: (restaurantID: string, date: string, time: string,  numberOfGuests: number) => void,
    addCustomerDetails: (name: string, lastname: string, email: string, phone: string) => void
}

export const UserInputContext = createContext<IUserInputContext>({
    newBooking: new NewBooking("", "", "", 0, {name: "", lastname: "", email: "", phone: ""}),
    addBookingDetails: (restaurantID: string, date: string, time: string,  numberOfGuests: number) => {},
    addCustomerDetails: (name: string, lastname: string, email: string, phone: string) => {}
}
)
