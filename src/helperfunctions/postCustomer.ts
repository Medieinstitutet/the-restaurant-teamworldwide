import axios from "axios"
import { NewCustomer } from "../models/Customer"

export const postCustomer = async <T>(url:string, data: NewCustomer) => {
    return await axios.post<T>(url, data)
}