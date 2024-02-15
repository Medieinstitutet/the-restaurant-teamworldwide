import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';

import { StaticDatePicker } from '@mui/x-date-pickers';
import { CheckForAvailabilityContext, UserInputContext } from '../contexts/userInputs';
import { checkForAvailability } from '../helperfunctions/checkforavailbility';

const DateTimeInfo = () => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs('2022-04-17'))
    const [selectedDataFormatted, setSelectedDataFormatted] = useState("")
    const [sixSelected, setSixSelected] = useState(false)
    const [nineSelected, setNineSelected] = useState(false)
    const [timeBooked, setTimeBooked] = useState("")
    const [numberOfPeople, setNumberOfPeople] = useState("")
    const [fieldsFilled, setFieldsFilled] = useState(false)

    const { addBookingDetails } = useContext(UserInputContext)
    const { toggleFullyBookedAtSix,
        fullyBookedAtSix,
        fullyBookedAtNine,
        toggleFullyBookedAtNine 
    } = useContext(CheckForAvailabilityContext)

    const navigate = useNavigate()

    useEffect(() => {
        console.log("user input is updated")
        const selecteDateIsoString = selectedDate?.toISOString()
        setSelectedDataFormatted(dayjs(selecteDateIsoString).format('YYYY-MM-DD'));
    }, [selectedDate])

    useEffect(() => {
        if (selectedDataFormatted) checkForAvailability(toggleFullyBookedAtNine, toggleFullyBookedAtSix, selectedDataFormatted)
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
                        </div>
                    </div>
                </div>

                <div className=' bg-white pt-24 lg:w-[70%] px-20'>
                    <StaticDatePicker value={selectedDate} onChange={
                        (newValue) => setSelectedDate(newValue)
                    }
                        defaultValue={dayjs()}
                    />
                    <div className='space-x-12'>
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

                    <div>

                    </div>


                </div>

            </div>


        </>
    )
}

export default DateTimeInfo