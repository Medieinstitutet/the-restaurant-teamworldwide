import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';


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
    const [numberOfBookingsOnSelectedDate, setNumberOfBookingsOnSelectedDate] = useState(0)
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('contactinfo')
    }

    useEffect(() => {
        const dateIsoString = selectedDate?.toISOString()
        const formattedDate = dayjs(dateIsoString).format('YYYY-MM-DD');
        const fetchAllBookings = async () => {
            const response = await axios.get<IRecievedBookings[]>("https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c6199912ebb6ed53265ac6/")
            const allBookings = response.data
            console.log(allBookings)
            const listOfDates = []
            allBookings.map((booking) => { if (booking.date.toString() === formattedDate) listOfDates.push(booking) })
            console.log("list of dates that match" + listOfDates.length)
            setNumberOfBookingsOnSelectedDate(listOfDates.length)
        }
        fetchAllBookings()
        console.log(formattedDate)
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
            <div>{numberOfBookingsOnSelectedDate > 16 ? "the restaurant is fully booked that day" : "we have room for you"}</div>

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