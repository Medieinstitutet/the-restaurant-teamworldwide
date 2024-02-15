import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import "../styles/main.scss"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useState } from 'react';
import { CheckForAvailabilityContext, ICheckForAvailability, IUserInputContext, UserInputContext } from '../contexts/userInputs';
import { NewBooking } from '../models/Booking';
import dayjs from 'dayjs';

const Layout = () => {
    //state for userinput
    const [userInputState, setUserInputState] = useState<IUserInputContext>({
        newBooking: new NewBooking("", "", "", 0, { name: "", lastname: "", email: "", phone: "" }),
        addBookingDetails: (restaurantID: string, date: string, time: string, numberOfGuests: number) => { },
        addCustomerDetails: (name: string, lastname: string, email: string, phone: string) => { }
    })
    userInputState.addBookingDetails = (restaurantID: string, date: string, time: string, numberOfGuests: number) => {
        setUserInputState({
            ...userInputState, newBooking: { ...userInputState.newBooking, restaurantId: restaurantID, date: date, time: time, numberOfGuests: numberOfGuests }
        })
    }
    userInputState.addCustomerDetails = (name: string, lastname: string, email: string, phone: string) => {
        setUserInputState({ ...userInputState, newBooking: { ...userInputState.newBooking, customer: { name, lastname, email, phone } } })
    }

    //state for availbilitycheck
    const [availbilityState, setAvailabilityState] = useState<ICheckForAvailability>({
        toggleFullyBookedAtSix: (bool: boolean) => { },
        toggleFullyBookedAtNine: (bool: boolean) => { },
        fullyBookedAtSix: false,
        fullyBookedAtNine: false,
    })

    availbilityState.toggleFullyBookedAtNine = (bool) => { setAvailabilityState({ ...availbilityState, fullyBookedAtNine: bool }) }
    availbilityState.toggleFullyBookedAtSix = (bool) => { setAvailabilityState({ ...availbilityState, fullyBookedAtSix: bool }) }

    return (
        <div className='font-serif'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CheckForAvailabilityContext.Provider value={availbilityState}>
                    <UserInputContext.Provider value={userInputState}>
                        <Navbar />
                        <Outlet />
                        <Footer />
                    </UserInputContext.Provider>
                </CheckForAvailabilityContext.Provider>
            </LocalizationProvider>
        </div >
    )
}

export default Layout