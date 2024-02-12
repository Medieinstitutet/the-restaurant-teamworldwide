import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';
import { listClasses } from '@mui/material';


interface IRecievedBookings {
    _id: string,
    restaurantId: string,
    date: string,
    time: string,
    numberOfGuests: number
}


const DateTimeInfo = () => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
    const [sixBooked, setSixBooked] = useState(false)
    const [nineBooked, setNineBooked] = useState(false)
    const [numberOfBookingsOnSelectedDate18, setNumberOfBookingsOnSelectedDate18] = useState(0)
    const [numberOfBookingsOnSelectedDate21, setNumberOfBookingsOnSelectedDate21] = useState(0)
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('contactinfo')
    }

    useEffect(() => {
        const selecteDateIsoString = selectedDate?.toISOString()
        const selectedDataFormatted = dayjs(selecteDateIsoString).format('YYYY-MM-DD');
        const fetchAllBookings = async () => {
            const response = await axios.get<IRecievedBookings[]>("https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c6199912ebb6ed53265ac6/")
            const allBookings = response.data
            console.log(allBookings)
            const currentBookingsOnSelectedDateAt18= []
            const currentBookingsOnSelectedDateAt21= []
            allBookings.map((booking) => { 
                if ((booking.date.toString() === selectedDataFormatted) && (booking.time.toString() === "18:00")) 
                {currentBookingsOnSelectedDateAt18.push(booking)} 
                else if ((booking.date.toString() === selectedDataFormatted) && (booking.time.toString() === "21:00")) 
                {currentBookingsOnSelectedDateAt21.push(booking)}
            })
            console.log("list of dates that match at 18 is " + currentBookingsOnSelectedDateAt18.length)
            console.log("list of dates that match at 21 is " + currentBookingsOnSelectedDateAt21.length)
            setNumberOfBookingsOnSelectedDate18(currentBookingsOnSelectedDateAt18.length)
            setNumberOfBookingsOnSelectedDate21(currentBookingsOnSelectedDateAt21.length)
        }
        fetchAllBookings()
        console.log(selectedDataFormatted)

    }, [selectedDate])



    return (
        <>
            <div className="m-10">
                <DatePicker
                    label="Select a date!"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                />
            </div>
            <div>{numberOfBookingsOnSelectedDate18 > 16 ? "the restaurant is fully booked that day at 18" : "we have room for you at 18"}</div>
            <div>{numberOfBookingsOnSelectedDate21 > 16 ? "the restaurant is fully booked that day at 21" : "we have room for you at 21"}</div>


            <div className='flex justify-center space-x-8'>
                <button onClick={() => setSixBooked(!sixBooked)} className="btn btn-ghost text-xl bg-slate-300">{sixBooked ? "cancel six o clock" : "choose six o clock"}</button>

                <button onClick={() => setNineBooked(!nineBooked)} className="btn btn-ghost text-xl bg-slate-300">{nineBooked ? "cancel nine o clock" : "choose nine o clock"}</button>
            </div>

            <form /* onSubmit={}  */ action="">

                <Link to={"/contactinfo"}><button onClick={handleClick}>Click here to submit date time stuff</button></Link>
            </form>
        </>
    )
}

export default DateTimeInfo