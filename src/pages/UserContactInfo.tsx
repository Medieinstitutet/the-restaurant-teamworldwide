import React, { useContext, useEffect, useState } from 'react'
import { ICreateCustomerResponse, NewCustomer } from '../models/Customer';
import { UserInputContext } from '../contexts/userInputs';
import { IConfirmedBooking, INewBooking, NewBooking } from '../models/Booking';
import ClipLoader from "react-spinners/ClipLoader";
import { postCustomer } from '../helperfunctions/postCustomer';
import { API_URL, CREATE_BOOKING, CREATE_CUSTOMER, RESTAURANT_ID } from '../constants/constants';
import { openModal } from '../helperfunctions/openModal';
import { postBooking } from '../helperfunctions/postBooking';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { Button } from '../components/Button';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';

const UserContactInfo = () => {

  const [createCustomerInput, setCreateCustomerInput] = useState<NewCustomer>(new NewCustomer("", "", "", ""))
  const [fieldsFilled, setFieldsFilled] = useState(false)
  const [bookingId, setBookingId] = useState("")
  const [contextIsUpdating, setContextIsUpdating] = useState(false)
  const [isAgreed, setIsAgreed] = useState(false);

  const { newBooking, addBookingDetails, addCustomerDetails } = useContext(UserInputContext)


  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateCustomerInput({ ...createCustomerInput, [e.target.name]: e.target.value })
    updateContextWithUserInput()
  }

  const saveContextAndSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    updateContextWithUserInput()
    if (!contextIsUpdating) {
      openModal()
      onSubmit()
    }
  }

  const updateContextWithUserInput = () => {
    setContextIsUpdating(true)
    addCustomerDetails(createCustomerInput.name, createCustomerInput.lastname, createCustomerInput.email, createCustomerInput.phone)
    setContextIsUpdating(false)
  }

  const onSubmit = async () => {
    createCustomer()
    createBooking()
  }

  const createBooking = async () => {
    try {
      const bookingResponse = await postBooking<IConfirmedBooking>(`${API_URL}${CREATE_BOOKING}`, new NewBooking(RESTAURANT_ID, newBooking.date, newBooking.time, Number(newBooking.numberOfGuests), newBooking.customer))
      const bookingID = bookingResponse.data.insertedId
      setBookingId(bookingID)
    } catch (error) {
      console.log(error)
    }
  }

  const createCustomer = async () => {
    try {
      const customerResponse = await postCustomer<ICreateCustomerResponse>(`${API_URL}${CREATE_CUSTOMER}`, new NewCustomer(newBooking.customer.name, newBooking.customer.lastname, newBooking.customer.email, newBooking.customer.phone))
      const CustomerID = customerResponse.data
      console.log(CustomerID + "this is the customer ID")
    } catch (error) {
      console.log(error)
    }
  }

  const formControl = () => {
    if (createCustomerInput.name && createCustomerInput.email && createCustomerInput.lastname && createCustomerInput.phone && isAgreed) {
      setFieldsFilled(true)
    } else {
      setFieldsFilled(false)
    }
  }

  useEffect(() => {
    formControl()
  }, [createCustomerInput.name, createCustomerInput.email, createCustomerInput.lastname, createCustomerInput.phone, isAgreed])


  useEffect(() => {
    if (newBooking.numberOfGuests && newBooking.date && newBooking.time) {
      console.log("updating local storage with " + newBooking.date, newBooking.time, newBooking.numberOfGuests)
      localStorage.setItem("context", JSON.stringify(newBooking))
    }
    if (!newBooking.numberOfGuests && !newBooking.date && !newBooking.time) {
      console.log("fetching localstorage....")
      const storedBookingDetails = localStorage.getItem("context")
      if (storedBookingDetails) {
        try {
          const storedBookingDetailsParsed: INewBooking = JSON.parse(storedBookingDetails)
          console.log("local storage" + storedBookingDetailsParsed.numberOfGuests, storedBookingDetailsParsed.date, storedBookingDetailsParsed.time)
          addBookingDetails(storedBookingDetailsParsed.restaurantId, storedBookingDetailsParsed.date, storedBookingDetailsParsed.time, storedBookingDetailsParsed.numberOfGuests)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }, [])

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(e.target.checked);
  };

  return (
    <div className='booking-background min-h-screen mt-16 pt-20 pb-44 flex flex-col items-center gap-10'>
      <div className='contact-info mt-16 px-10 py-10 flex flex-col items-center gap-10 rounded-lg'>
        <h1 className='text-slate-600'>Your details</h1>
        <div className='contact-form w-full max-w-lg flex flex-col gap-6 px-10 py-5 rounded-lg'>
          <div>
            <span className="label-text text-base font-medium text-slate-600 mr-3">First name</span>
            {createCustomerInput.name ? <DoneIcon color="success"/> :  <EditIcon /> } <input type="text" required name="name" value={createCustomerInput.name} onChange={handleNameChange} className="input input-bordered w-full max-w-full mt-2" />
          </div>
          <div>
            <span className="label-text text-base font-medium text-slate-600 mr-3">Last name</span>
            {createCustomerInput.lastname ? <DoneIcon color="success"/> :  <EditIcon /> }
            <input type="text" required name="lastname" value={createCustomerInput.lastname} onChange={handleNameChange} className="input input-bordered w-full max-w-full mt-2" />
          </div>
          <div>
            <span className="label-text text-base font-medium text-slate-600 mr-3">Email</span>
            {createCustomerInput.email ? <DoneIcon color="success"/> :  <EditIcon /> }
            <input type="text" required name="email" value={createCustomerInput.email} onChange={handleNameChange} className="input input-bordered w-full max-w-full mt-2" />
          </div>
          <div>
            <span className="label-text text-base font-medium text-slate-600 mr-3">Phone</span>
            {createCustomerInput.phone ? <DoneIcon color="success"/> :  <EditIcon /> }

            <input name="phone" type="tel" required value={createCustomerInput.phone} onChange={handleNameChange} className="input textarea-bordered w-full max-w-full mt-2" />
          </div>

          <div className=''>
            <input
              type='checkbox'
              id='agree-checkbox'
              checked={isAgreed}
              onChange={handleCheckBox} />
            <label className='ml-2' htmlFor='agree' id='agree-txt'>I acknowledge that we collect and store customer information.</label>
            <Button children={'Confirm Booking'} size={'md'} color={'light'} event={(e) => saveContextAndSend(e)} disabled={!fieldsFilled} className='w-full mt-6'/>
          </div>
          <dialog id="my_modal_4" className="modal">

            {!bookingId ? <ClipLoader /> :
              <div className="modal-box min-w-fit">
                <img src="src\assets\Bleu horizon (1).png" alt="" />
                <div className='modal-box__right'>
                  <h3 className="font-bold text-2xl">Booking confirmation</h3>
                  <div className='modal-box__text'>
                    <p className="detail"><AccessTimeIcon />{newBooking.time}</p>
                    <p className="detail"><CalendarMonthIcon />{newBooking.date}</p>
                    <p className="detail"><GroupIcon />{newBooking.numberOfGuests}</p>
                    <p className="detail"><AccountCircleIcon />{newBooking.customer.name} {newBooking.customer.lastname}</p>
                    <p className="detail"><MailIcon />{newBooking.customer.email}</p>
                    <p className="detail"><CallIcon />{newBooking.customer.phone}</p>
                  </div>
                  <form method="dialog">
                    <Button children={'Close'} size={'md'} color={'light'} linkTo='/'/>
                  </form>
                </div>
              </div>
            }
          </dialog>
        </div>
      </div>
    </div>

  )
}
export default UserContactInfo