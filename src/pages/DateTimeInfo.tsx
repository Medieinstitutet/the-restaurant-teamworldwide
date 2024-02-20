import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';

import { DesktopDatePicker } from '@mui/x-date-pickers';
import { UserInputContext } from '../contexts/userInputs';
import { checkForAvailability } from '../helperfunctions/checkforavailbility';
import { IReceivedBookings, NewBooking } from '../models/Booking';
import { API_URL, GET_ALL_BOOKINGS, RESTAURANT_ID } from '../constants/constants';
import { get } from '../helperfunctions/get';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import { Button } from '../components/Button';

const DateTimeInfo = () => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>()
    const [selectedDataFormatted, setSelectedDataFormatted] = useState("")
    const [sixSelected, setSixSelected] = useState(false)
    const [nineSelected, setNineSelected] = useState(false)
    const [timeBooked, setTimeBooked] = useState("")
    const [numberOfPeople, setNumberOfPeople] = useState("")
    const [fieldsFilled, setFieldsFilled] = useState(false)
    const [fullyBookedAtSix, setFullyBookedAtSix] = useState(false)
    const [fullyBookedAtNine, setFullyBookedAtNine] = useState(false)


    const { addBookingDetails } = useContext(UserInputContext)

    const navigate = useNavigate()

    useEffect(() => {
        if (!selectedDate) return
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
        setSixSelected(false)
        setNineSelected(false)
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

    const handleUserInput = () => {
        addBookingDetails(RESTAURANT_ID, selectedDataFormatted, timeBooked, +numberOfPeople)
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

                <div className='date-picker bg-white py-24 lg:w-[70%] px-48 flex flex-col justfy-center gap-12'>
                    <div className='flex items-center gap-5'>
                            {selectedDataFormatted ? <CalendarMonthIcon color="success" /> : <CalendarMonthIcon color="warning" />}
                        <DesktopDatePicker
                            value={selectedDate || null}
                            onChange={
                                (newValue) => setSelectedDate(newValue)
                            }
                            label="Choose a date"
                        />
                    </div>

                    <div className=''>
                        <div className='flex items-center gap-5'>
                            {timeBooked ? <AccessTimeIcon color="success" /> : <AccessTimeIcon color="warning" />}
                            <div className='time-buttons'>
                                {fullyBookedAtSix ? 
                                    <Button children={'Six o clock'} disabled={true} size={'md'} color={'transparent'} />
                                    : 
                                    <Button children={'Six o clock'} selected={sixSelected ? true : false}  disabled={false} event={() => handleSixSelected()} size={'md'} color={'transparent'} />
                                }
                                {fullyBookedAtNine ?
                                    <Button children={'Nine o clock'} disabled={true} size={'md'} color={'transparent'} />
                                    : 
                                    <Button children={'Nine o clock'}  selected={nineSelected ? true : false} disabled={false} event={() => handleNineSelected()} size={'md'} color={'transparent'} />
                                }
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center gap-5'>
                            {numberOfPeople ? <GroupIcon color="success" /> : <GroupIcon color="warning" />}
                        <select className="select select-bordered"
                            onChange={(event) => handleNumberOfPeopleChange(event.target.value)}>
                            <option value="">Choose how many will be joining us</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            <option value="4">Four</option>
                            <option value="5">Five</option>
                            <option value="6">Six</option>
                        </select>
                    </div>

                    <button disabled={!fieldsFilled} className='btn self-center px-8 bg-primary hover:bg-neutral-50 text-neutral-50 hover:text-primary border-primary' onClick={() => handleUserInput()}>Next</button>
                </div>
            </div>
        </>
    )
}

export default DateTimeInfo