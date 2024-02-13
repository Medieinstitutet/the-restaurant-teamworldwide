import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';
import AddComponent from '../components/dateTimePicker';


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
        if (!nineSelected) setTimeBooked("18:00")
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
            <div className="w-100% bg-primary h-screen lg:flex sm:flex-row">
                <div className='bg-black lg:h-[100%] lg:w-[30%] sm:w[100%] sm:pb-20 sm:h-[50%] text-secondary pt-24'>
                    <h1 className='text-6xl text-center mt-12'>BLEU HORIZON</h1>
                    <h4 className='text-xl text-center'>GASTROPUB</h4>
                    <h4 className='text-4xl text-center mt-40'>Make your reservation today!</h4>
                    <div className='flex justify-center space-x-8 mt-20 pt-24 text-white'>
                        <button onClick={() => handleBookSix()} className='btn self-center px-8 bg-primary hover:bg-neutral-50 text-neutral-50 hover:text-primary border-primary'>Six o clock</button>
                        <button onClick={() => handleBookNine()} className='btn self-center px-8 bg-primary hover:bg-neutral-50 text-neutral-50 hover:text-primary border-primary'>Nine o clock</button>
                    </div>
                </div>

                <div className=' bg-white pt-24 lg:w-[70%] sm:[h-100%] pl-20'>
                    <h1>Booking at bleu</h1>
                    <AddComponent
                        selectedDate={selectedDate}
                        onChange={(newDate) => setSelectedDate(newDate)}
                    />
                    <div>
                        <select className="select select-bordered w-full max-w-xs font">
                            <option disabled selected>How many poeple will be joining us?</option>
                            <option>One</option>
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