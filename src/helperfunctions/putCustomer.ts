import axios from "axios"
import { ExisitingCustomer } from "../models/Customer"



export const putCustomer = async <T>(url:string, data: ExisitingCustomer) => {
    return await axios.put<T>(url, data)
}