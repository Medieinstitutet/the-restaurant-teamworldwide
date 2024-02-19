import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';

import { StaticDatePicker } from '@mui/x-date-pickers';
import { UserInputContext } from '../contexts/userInputs';
import { checkForAvailability } from '../helperfunctions/checkforavailbility';
import { IReceivedBookings, NewBooking } from '../models/Booking';
import { API_URL, GET_ALL_BOOKINGS, RESTAURANT_ID } from '../constants/constants';
import { get } from '../helperfunctions/get';

const DateTimeInfo = () => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs('2022-04-17'))
    const [selectedDataFormatted, setSelectedDataFormatted] = useState("")
    const [sixSelected, setSixSelected] = useState(false)
    const [nineSelected, setNineSelected] = useState(false)
    const [timeBooked, setTimeBooked] = useState("")
    const [numberOfPeople, setNumberOfPeople] = useState("")
    const [fieldsFilled, setFieldsFilled] = useState(false)
    const [fullyBookedAtSix, setFullyBookedAtSix] = useState(false)
    const [fullyBookedAtNine, setFullyBookedAtNine] = useState(false)


    const { addBookingDetails,  newBooking} = useContext(UserInputContext)

    const navigate = useNavigate()

    useEffect(() => {
        console.log("user input is updated")
        const selecteDateIsoString = selectedDate?.toISOString()
        setSelectedDataFormatted(dayjs(selecteDateIsoString).format('YYYY-MM-DD'));
    }, [selectedDate])

    useEffect(() => {
        const fetchData = async () => {

            const response = await get<IReceivedBookings[]>(
                `${API_URL}${GET_ALL_BOOKINGS}${RESTAURANT_ID}`)
            const allBookings = response.data;
            console.log(allBookings.length)
            const bookingsAt18and21 = checkForAvailability(selectedDataFormatted, allBookings)
            const bookingsAt18 = bookingsAt18and21[0]
            const bookingsAt21 = bookingsAt18and21[1]
            if (bookingsAt18.length >= 16) {
                setFullyBookedAtSix(true)
            } else {
                (bookingsAt18.length <= 16)
                setFullyBookedAtSix(false)
            }
            if (bookingsAt21.length >= 16) {
                setFullyBookedAtNine(true)
            } else {
                (bookingsAt21.length <= 16)
                setFullyBookedAtNine(false)
            }
        }


        if (selectedDataFormatted) {
            fetchData()
        }
        setTimeBooked("")
    }, [selectedDataFormatted])

    useEffect(() => {
        formControl()
    }, [timeBooked, selectedDataFormatted, numberOfPeople])


    useEffect(() => {
        if (sixSelected) setTimeBooked("18:00")
        if (nineSelected) setTimeBooked("21:00")
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

    useEffect(() => {
        localStorage.setItem("context", JSON.stringify(newBooking))
    })

    const handleUserInput = () => {
        addBookingDetails("65c6199912ebb6ed53265ac6", selectedDataFormatted, timeBooked, +numberOfPeople)
        navigate("/contactinfo")
    }

    const formControl = () => {
        if (timeBooked && selectedDataFormatted && numberOfPeople) {
            setFieldsFilled(true)
        } else {
            setFieldsFilled(false)
        }
    }






    return (
        <>
            <div className="w-100% lg:flex sm:flex-row mt-16 p-7">
                <div className='bg-black lg:h-[100%] lg:w-[30%] sm:w[100%] sm:pb-20 sm:h-[50%] text-secondary pt-24'>
                    <div className='w-100% flex justify-center'>
                        <img src="../../webp-img/Bleu horizon (1).webp" alt="Bleu Horizon Logo" />
                    </div>
                    <div className='flex flex-col justify-center'>
                    <h4 className='text-4xl text-center'>Make your reservation today!</h4>
                    </div>
                </div>

                <div className='date-picker bg-white py-24 lg:w-[70%] px-20'>
                    <StaticDatePicker value={selectedDate} onChange={
                        (newValue) => setSelectedDate(newValue)
                    }
                        defaultValue={dayjs()}
                    />
                    <div className='time-buttons space-x-12'>
                        {fullyBookedAtSix ? <button disabled className='btn self-center px-8 bg-primary hover:bg-neutral-50 text-neutral-50 hover:text-primary border-primary'>Six o clock</button> : <button onClick={() => handleSixSelected()} className='btn self-center px-8 bg-primary hover:bg-neutral-50 text-neutral-50 hover:text-primary border-primary'>Six o clock</button>}
                        {fullyBookedAtNine ? <button disabled className='btn self-center px-8 bg-primary hover:bg-neutral-50 text-neutral-50 hover:text-primary border-primary'>Nine o clock</button> : <button onClick={() => handleNineSelected()} className='btn self-center px-8 bg-primary hover:bg-neutral-50 text-neutral-50 hover:text-primary border-primary'>Nine o clock</button>}
                    </div>

                    <select className="mt-12 mr-12 select select-bordered w-full max-w-xs font"
                        onChange={(event) => handleNumberOfPeopleChange(event.target.value)}>
                        <option disabled>How many poeple will be joining us?</option>
                        <option value="">Choose an option</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        <option value="4">Four</option>
                        <option value="5">Five</option>
                        <option value="6">Six</option>
                    </select>
                    <button disabled={!fieldsFilled} className='btn self-center px-8 bg-primary hover:bg-neutral-50 text-neutral-50 hover:text-primary border-primary' onClick={() => handleUserInput()}>Next</button>
                </div>

            </div>


        </>
    )
}

export default DateTimeInfo