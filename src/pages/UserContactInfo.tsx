import React, { useContext, useEffect, useState } from 'react'
import { ICreateCustomerResponse, NewCustomer } from '../models/Customer';
import { UserInputContext } from '../contexts/userInputs';
import { IConfirmedBooking, NewBooking } from '../models/Booking';
import ClipLoader from "react-spinners/ClipLoader";
import { postCustomer } from '../helperfunctions/postCustomer';
import { API_URL, CREATE_BOOKING, CREATE_CUSTOMER, RESTAURANT_ID } from '../constants/constants';
import { openModal } from '../helperfunctions/opdenModal';
import { postBooking } from '../helperfunctions/postBooking';


const UserContactInfo = () => {

  const [createCustomerInput, setCreateCustomerInput] = useState<NewCustomer>(new NewCustomer("", "", "", ""))
  const [fieldsFilled, setFieldsFilled] = useState(false)
  const [bookingId, setBookingId] = useState("")
  const [contextIsUpdating, setContextIsUpdating] = useState(false)
  const [isAgreed, setIsAgreed] = useState(false);

  const { newBooking, addCustomerDetails } = useContext(UserInputContext)
  

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateCustomerInput({ ...createCustomerInput, [e.target.name]: e.target.value })
    updateContextWithUserInput()
  }

  const saveContextAndSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    updateContextWithUserInput()
      if (!contextIsUpdating){
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

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(e.target.checked);
  };

  return (
    <div className='booking-background min-h-screen mt-16 pt-20 pb-44 flex flex-col items-center gap-10'>
    <div className='contact-info mt-16 px-10 py-10 flex flex-col items-center gap-10 rounded-lg'>
      <h1 className='text-slate-600'>Your details</h1>
      <div className='contact-form w-full max-w-lg flex flex-col gap-6 px-10 py-5 rounded-lg'>
        <div>
          <span className="label-text text-base font-medium text-slate-600">First name *</span>
          <input type="text" required name="name" value={createCustomerInput.name} onChange={handleNameChange} className="input input-bordered w-full max-w-full mt-2" />
        </div>
        <div>
          <span className="label-text text-base font-medium text-slate-600">Last name *</span>
          <input type="text" required name="lastname" value={createCustomerInput.lastname} onChange={handleNameChange} className="input input-bordered w-full max-w-full mt-2" />
        </div>
        <div>
          <span className="label-text text-base font-medium text-slate-600">Email *</span>
          <input type="text" required name="email" value={createCustomerInput.email} onChange={handleNameChange} className="input input-bordered w-full max-w-full mt-2" />
        </div>
        <div>
          <span className="label-text text-base font-medium text-slate-600">Phone *</span>
          <input name="phone" type="tel" required value={createCustomerInput.phone} onChange={handleNameChange} className="input textarea-bordered w-full max-w-full mt-2" />
        </div>

    <div className=''>
    <input 
        type='checkbox' 
        id='agree-checkbox'
       /*  className='toggle toggle-success' */
        checked= {isAgreed}
        onChange={handleCheckBox} />
    <label className='ml-2' htmlFor='agree' id='agree-txt'>I acknowledge that we collect and store customer information.</label>
        <button onClick={(e) => saveContextAndSend(e)} disabled={!fieldsFilled} className="btn w-full self-center mt-6 bg-primary hover:bg-neutral-50 text-neutral-50 hover:text-primary border-primary">Confirm Booking</button>
        </div>
        <dialog id="my_modal_4" className="modal">

          {!bookingId ? <ClipLoader /> :
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg mb-12">Booking confirmation</h3>
            <p>please make a note of your booking ID for cancellations or change: {bookingId} </p>
            <div>
              <p className="py-4">Time booked: {newBooking.time}</p>
              <p className="py-4">Date booked: {newBooking.date}</p>
              <p className="py-4">Number of guests: {newBooking.numberOfGuests}</p>
              <p className="py-4">Name: {newBooking.customer.name}</p>
              <p className="py-4">Last name: {newBooking.customer.lastname}</p>
              <p className="py-4">Contact email: {newBooking.customer.email}</p>
              <p className="py-4">Contact number: {newBooking.customer.phone}</p>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
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