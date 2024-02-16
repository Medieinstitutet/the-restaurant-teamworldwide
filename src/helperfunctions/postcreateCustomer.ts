import axios from "axios"
import { NewBooking } from "../models/Booking"

export const createCustomer = async <T>(url:string, data: NewBooking) => {
    return await axios.post<T>(url, data)
}