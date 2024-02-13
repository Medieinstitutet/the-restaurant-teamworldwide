import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
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
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs('2022-04-17'))
    const [selectedDataFormatted, setSelectedDataFormatted] = useState("")
    const [sixSelected, setSixSelected] = useState(false)
    const [nineSelected, setNineSelected] = useState(false)
    const [timeBooked, setTimeBooked] = useState("")
    const [fullyBooked18OnSelectedDate, setFullyBooked18OnSelectedDate] = useState(false)
    const [fullyBooked21OnSelectedDate, setFullyBooked21OnSelectedDate] = useState(false)
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('contactinfo')
    }

    useEffect(() => {
        const selecteDateIsoString = selectedDate?.toISOString()
        setSelectedDataFormatted(dayjs(selecteDateIsoString).format('YYYY-MM-DD'));
        const fetchAllBookings = async () => {
            const response = await axios.get<IRecievedBookings[]>("https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c6199912ebb6ed53265ac6/")
            const allBookings = response.data
            console.log(allBookings)
            const currentBookingsOnSelectedDateAt18 = []
            const currentBookingsOnSelectedDateAt21 = []
            allBookings.map((booking) => {
                if ((booking.date.toString() === selectedDataFormatted) && (booking.time.toString() === "18:00")) { currentBookingsOnSelectedDateAt18.push(booking) }
                else if ((booking.date.toString() === selectedDataFormatted) && (booking.time.toString() === "21:00")) { currentBookingsOnSelectedDateAt21.push(booking) }
            })
            if (currentBookingsOnSelectedDateAt18.length > 16) setFullyBooked18OnSelectedDate(true)
            if (currentBookingsOnSelectedDateAt21.length > 16) setFullyBooked21OnSelectedDate(true)
        }
        fetchAllBookings()
        console.log(selectedDataFormatted)

    }, [selectedDate])

    useEffect(() => {
        if (sixSelected) setTimeBooked("18:00")
        if (nineSelected) setTimeBooked("21:00")
    }, [sixSelected, nineSelected])

    const handleBookSix = () => {
        setSixSelected((prev) => !prev)
        setNineSelected(false)
    }

    const handleBookNine = () => {
        setNineSelected((prev) => !prev)
        setSixSelected(false)
    }




    return (
        <>
            <div className="w-100% bg-primary h-screen flex">
                <div className='bg-black h-[100%] w-[30%] pt-32 text-neutral-50'>
                    <h1 className='text-6xl text-center mt-12'>BLEU HORIZON</h1>
                    <h4 className='text-xl text-center'>GASTROPUB</h4>
                    <div className='flex justify-center space-x-8 mt-20 pt-24'>
                        <button disabled={fullyBooked18OnSelectedDate} onClick={() => handleBookSix()} className="btn btn-ghost text-xl bg-primary w-[40%]">{sixSelected ? "cancel six o clock" : "Six o clock"}</button>
                        <button disabled={fullyBooked21OnSelectedDate} onClick={() => handleBookNine()} className="btn btn-ghost text-xl bg-primary w-[40%]">{nineSelected ? "cancel nine o clock" : "Nine o clock"}</button>
                    </div>
                </div>
                <div className=' bg-white pt-40 w-[70%]'>
                    <DateCalendar className='text-primary text-8xl' value={selectedDate} onChange={(newValue) => setSelectedDate(newValue)} />

                </div>
            </div>
            <div>{fullyBooked18OnSelectedDate && "the restaurant is fully booked that day at 18"}</div>
            <div>{fullyBooked21OnSelectedDate && "the restaurant is fully booked that day at 21"}</div>


            <div className='flex justify-center space-x-8'>
                <button disabled={fullyBooked18OnSelectedDate} onClick={() => handleBookSix()} className="btn btn-ghost text-xl bg-slate-300">{sixSelected ? "cancel six o clock" : "choose six o clock"}</button>
                <button disabled={fullyBooked21OnSelectedDate} onClick={() => handleBookNine()} className="btn btn-ghost text-xl bg-slate-300">{nineSelected ? "cancel nine o clock" : "choose nine o clock"}</button>
            </div>

            <h1>The current date reservation for API post is: {selectedDataFormatted}</h1>
            <h1>The current time reservation for API post is: {timeBooked}</h1>
            <form /* onSubmit={}  */ action="">

                <Link to={"/contactinfo"}><button onClick={handleClick}>Click here to submit date time stuff</button></Link>
            </form>
        </>
    )
}

export default DateTimeInfo