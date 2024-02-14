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
    const [numberOfPeople, setNumberOfPeople] = useState("One")

    useEffect(() => {
        console.log("user input is updated")
        const selecteDateIsoString = selectedDate?.toISOString()
        setSelectedDataFormatted(dayjs(selecteDateIsoString).format('YYYY-MM-DD'));
    }, [selectedDate])

    useEffect(() => {
        const fetchAllBookings = async () => {
            const response = await axios.get<IRecievedBookings[]>("https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c6199912ebb6ed53265ac6/")
            const allBookings = response.data
            const bookingsOnSelectedDate: IRecievedBookings[] = []
            allBookings.map((booking) => {
                if ((booking.date.toString() === selectedDataFormatted) && (booking.time.toString() === "18:00")) { bookingsOnSelectedDate.push(booking) }
            })
            const bookingsAt18OnSelectedDate = bookingsOnSelectedDate.filter((booking) => booking.time === "18:00")
            const bookingsAt21OnSelectedDate = bookingsOnSelectedDate.filter((booking) => booking.time === "21:00")       
            bookingsAt18OnSelectedDate.length > 16 ? setFullyBooked18OnSelectedDate(true) : setFullyBooked18OnSelectedDate(false)
            bookingsAt21OnSelectedDate.length > 16 ? setFullyBooked21OnSelectedDate(true) : setFullyBooked21OnSelectedDate(false)
        }
        if (selectedDataFormatted) fetchAllBookings()
        setTimeBooked("")
    }, [selectedDataFormatted])



    useEffect(() => {
        if(sixSelected) setTimeBooked("18:00")
        if(nineSelected) setTimeBooked("21:00")
    }, [sixSelected, nineSelected])

    const handleNumberOfPeopleChange = (value: string) => {
        setNumberOfPeople(value)
    }
    const handleSixSelected = () => {
        setSixSelected(true);
        setNineSelected(false)
    }

    const handleNineSelected = () => {
        setSixSelected(false);
        setNineSelected(true)
    }

    const handleUserInput = () => {
        
    }




    return (
        <>
            <div className="w-100% bg-primary h-screen lg:flex sm:flex-row">
                <div className='bg-black lg:h-[100%] lg:w-[30%] sm:w[100%] sm:pb-20 sm:h-[50%] text-secondary pt-24'>
                    <h1 className='text-6xl text-center mt-12'>BLEU HORIZON</h1>
                    <h4 className='text-xl text-center'>GASTROPUB</h4>
                    <h4 className='text-4xl text-center mt-40'>Make your reservation today!</h4>
                    <div className='flex justify-center space-x-8 mt-20  text-white'>
                    <div>
                        Your booking details: 
                        <h4>{selectedDataFormatted ? selectedDataFormatted : "Please select a date"}</h4>
                        <h4>{timeBooked ? timeBooked : "Please select a time"}</h4>
                        <h4>For {numberOfPeople} persons</h4>
                        <button onClick={handleUserInput} className='btn self-center px-8 bg-primary hover:bg-neutral-50 text-neutral-50 hover:text-primary border-primary mt-12'>Submit</button>
                    </div>
                    </div>
                </div>

                <div className=' bg-white pt-24 lg:w-[70%] px-20 items-center'>
                    <StaticDatePicker value={selectedDate} onChange={
                        (newValue) => setSelectedDate(newValue)
                    }
                        defaultValue={dayjs()}
                    />
                        {fullyBooked18OnSelectedDate ? <button disabled className='btn self-center px-8 bg-primary hover:bg-neutral-50 text-neutral-50 hover:text-primary border-primary'>Six o clock</button> : <button onClick={() => handleSixSelected()} className='btn self-center px-8 bg-primary hover:bg-neutral-50 text-neutral-50 hover:text-primary border-primary'>Six o clock</button>}
                        {fullyBooked21OnSelectedDate ? <button disabled className='btn self-center px-8 bg-primary hover:bg-neutral-50 text-neutral-50 hover:text-primary border-primary'>Nine o clock</button> : <button onClick={() => handleNineSelected()} className='btn self-center px-8 bg-primary hover:bg-neutral-50 text-neutral-50 hover:text-primary border-primary'>Nine o clock</button>}

                    <div>

                        
                        <select className="mt-12 select select-bordered w-full max-w-xs font"
                        onChange={(event) => handleNumberOfPeopleChange(event.target.value)}>
                            <option disabled>How many poeple will be joining us?</option>
                            <option value="One">One</option>
                            <option value="Two">Two</option>
                            <option value="Three">Three</option>
                            <option value="Four">Four</option>
                            <option value="Five">Five</option>
                            <option value="Six">Six</option>
                        </select>
                    </div>


                </div>

            </div>


        </>
    )
}

export default DateTimeInfo