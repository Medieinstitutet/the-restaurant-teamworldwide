import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';

import { StaticDatePicker } from '@mui/x-date-pickers';


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



    useEffect(() => {
        console.log("user input is updated")
        const selecteDateIsoString = selectedDate?.toISOString()
        setSelectedDataFormatted(dayjs(selecteDateIsoString).format('YYYY-MM-DD'));
    }, [selectedDate])

    useEffect(() => {
        const fetchAllBookings = async () => {
            const response = await axios.get<IRecievedBookings[]>("https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c6199912ebb6ed53265ac6/")
            const allBookings = response.data
            const currentBookingsOnSelectedDateAt18 = []
            const currentBookingsOnSelectedDateAt21 = []
            allBookings.map((booking) => {
                if ((booking.date.toString() === selectedDataFormatted) && (booking.time.toString() === "18:00")) { currentBookingsOnSelectedDateAt18.push(booking) }
                if ((booking.date.toString() === selectedDataFormatted) && (booking.time.toString() === "21:00")) { currentBookingsOnSelectedDateAt21.push(booking) }
            })
            console.log("current bookings on" + selectedDataFormatted + "are" + currentBookingsOnSelectedDateAt18.length + "current bookings at 21 are " + currentBookingsOnSelectedDateAt21.length)
            if (currentBookingsOnSelectedDateAt18.length > 16) setFullyBooked18OnSelectedDate(true)
            if (currentBookingsOnSelectedDateAt21.length > 16) setFullyBooked21OnSelectedDate(true)

        }

        if (selectedDataFormatted) fetchAllBookings()
    }, [selectedDataFormatted])



    return (
        <>
            <div className="w-100% bg-primary h-screen lg:flex sm:flex-row">
                <div className='bg-black lg:h-[100%] lg:w-[30%] sm:w[100%] sm:pb-20 sm:h-[50%] text-secondary pt-24'>
                    <h1 className='text-6xl text-center mt-12'>BLEU HORIZON</h1>
                    <h4 className='text-xl text-center'>GASTROPUB</h4>
                    <h4 className='text-4xl text-center mt-40'>Make your reservation today!</h4>
                    <div className='flex justify-center space-x-8 mt-20 pt-24 text-white'>

                        <button className='btn self-center px-8 bg-primary hover:bg-neutral-50 text-neutral-50 hover:text-primary border-primary'>Six o clock</button>
                        <button className='btn self-center px-8 bg-primary hover:bg-neutral-50 text-neutral-50 hover:text-primary border-primary'>Nine o clock</button>
                    </div>
                    <h1 className='text-white'>{fullyBooked18OnSelectedDate ? "fully booked at 18" : ""}</h1>
                    <h1 className='text-white'>{fullyBooked21OnSelectedDate && "fully booked at 21"}</h1>
                </div>

                <div className=' bg-white pt-24 lg:w-[70%] sm:[h-100%] px-20'>
                    <h1 className='mb-20'>Booking at bleu</h1>


                    <StaticDatePicker value={selectedDate} onChange={
                        (newValue) => setSelectedDate(newValue)
                    }
                        defaultValue={dayjs('2022-04-17')}
                    />


                    <div>
                        <select className="select select-bordered w-full max-w-xs font">
                            <option disabled>How many poeple will be joining us?</option>
                            <option value="One">One</option>
                            <option>Two</option>
                            <option>Three</option>
                            <option>Four</option>
                            <option>Five</option>
                            <option>Six</option>
                        </select>
                        <div className='flex justify-center items-center space-x-4'>

                            <h1 className='text-2xl text-center'>You're selecting: {selectedDataFormatted} at {timeBooked} </h1>
                            <button className='btn self-center px-8 bg-primary hover:bg-neutral-50 text-neutral-50 hover:text-primary border-primary'>Send</button>
                        </div>
                    </div>


                </div>

            </div>


        </>
    )
}

export default DateTimeInfo