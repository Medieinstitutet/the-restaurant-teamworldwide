import axios from "axios"
import { NewBooking } from "../models/Booking"

export const postBooking = async <T>(url:string, data: NewBooking) => {
    return await axios.post<T>(url, data)
}