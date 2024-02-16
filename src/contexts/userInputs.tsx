import { createContext } from "react";
import { NewBooking } from "../models/Booking";
import dayjs, { Dayjs } from "dayjs";

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

export interface ICheckForAvailability {
    fullyBookedAtSix: boolean,
    fullyBookedAtNine: boolean,
    toggleFullyBookedAtSix: (boolean : boolean) => void,
    toggleFullyBookedAtNine: (boolean: boolean) => void,
}

export const CheckForAvailabilityContext = createContext<ICheckForAvailability>({
    toggleFullyBookedAtSix: (boolean) => {},
    fullyBookedAtSix: false,
    fullyBookedAtNine: false,
    toggleFullyBookedAtNine: (boolean) => {},

})

