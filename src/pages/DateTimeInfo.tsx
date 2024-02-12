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
    const [fullyBooked18OnSelectedDate, setFullyBooked18OnSelectedDate] = useState(false)
    const [fullyBooked21OnSelectedDate, setFullyBooked21OnSelectedDate] = useState(false)
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
            if(currentBookingsOnSelectedDateAt18.length>16) setFullyBooked18OnSelectedDate(true)
            if(currentBookingsOnSelectedDateAt21.length>16) setFullyBooked21OnSelectedDate(true)
        }
        fetchAllBookings()
        console.log(selectedDataFormatted)

    }, [selectedDate])

        const handleBookSix = () => {
            setSixBooked((prev) => !prev)
            setNineBooked(false)
        }

        const handleBookNine = () => {
            setNineBooked((prev) => !prev)
            setSixBooked(false)
        }




    return (
        <>
            <div className="m-10">
                <DatePicker
                    label="Select a date!"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                />
            </div>
            <div>{fullyBooked18OnSelectedDate && "the restaurant is fully booked that day at 18"}</div>
            <div>{fullyBooked21OnSelectedDate && "the restaurant is fully booked that day at 21"}</div>


            <div className='flex justify-center space-x-8'>
                <button disabled={fullyBooked18OnSelectedDate} onClick={() => handleBookSix()} className="btn btn-ghost text-xl bg-slate-300">{sixBooked ? "cancel six o clock" : "choose six o clock"}</button>
                <button disabled={fullyBooked21OnSelectedDate} onClick={() => handleBookNine()} className="btn btn-ghost text-xl bg-slate-300">{nineBooked ? "cancel nine o clock" : "choose nine o clock"}</button>
            </div>

            <form /* onSubmit={}  */ action="">

                <Link to={"/contactinfo"}><button onClick={handleClick}>Click here to submit date time stuff</button></Link>
            </form>
        </>
    )
}

export default DateTimeInfo