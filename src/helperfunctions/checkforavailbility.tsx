import axios from "axios"
import { IReceivedBookings } from "../models/Booking"

export const checkForAvailability = async (toggleFullyBookedAtNine: (boolean:boolean) => void, toggleFullyBookedAtSix: (boolean:boolean) => void, selectedDateFormatted: string) => {

    const response = await axios.get<IReceivedBookings[]>("https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c6199912ebb6ed53265ac6/")
    const allBookings = response.data
    const bookingsOnSelectedDate: IReceivedBookings[] = []
    allBookings.map((booking) => {
        if (booking.date.toString() === selectedDateFormatted) { bookingsOnSelectedDate.push(booking) }
    })
    const bookingsAt18OnSelectedDate = bookingsOnSelectedDate.filter((booking) => booking.time === "18:00")
    const bookingsAt21OnSelectedDate = bookingsOnSelectedDate.filter((booking) => booking.time === "21:00")
    bookingsAt18OnSelectedDate.length > 16 ? toggleFullyBookedAtSix(true) : toggleFullyBookedAtSix(false)
    bookingsAt21OnSelectedDate.length > 16 ? toggleFullyBookedAtNine(true) : toggleFullyBookedAtNine(false)
}

