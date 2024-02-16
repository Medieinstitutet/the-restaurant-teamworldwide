import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { NewCustomer } from '../models/Customer';
import { UserInputContext } from '../contexts/userInputs';
import { Link } from 'react-router-dom';
import { IConfirmedBooking } from '../models/Booking';


const UserContactInfo = () => {

  const [currentCapacity, setCurrentCapacity] = useState()
  const [createCustomerInput, setCreateCustomerInput] = useState<NewCustomer>(new NewCustomer("", "", "", ""))
  const [customerID, setCustomerID] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [fieldsFilled, setFieldsFilled] = useState(false)
  const [bookingId, setBookingId] = useState("")

  const { newBooking, addCustomerDetails } = useContext(UserInputContext)


  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateCustomerInput({ ...createCustomerInput, [e.target.name]: e.target.value })
  }

  const saveContextAndSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    console.log("logging submit")
    addCustomerDetails(createCustomerInput.name, createCustomerInput.lastname, createCustomerInput.email, createCustomerInput.phone)
    openModal()
    onSubmit()
  }

  const onSubmit = async () => {
    const response = await axios.post<IConfirmedBooking>("https://school-restaurant-api.azurewebsites.net/booking/create",
    {
      "restaurantId": newBooking.restaurantId,
      "date": newBooking.date,
      "time": newBooking.time,
      "numberOfGuests": Number(newBooking.numberOfGuests),
      "customer": {
        "name": newBooking.customer.name,
        "lastname": newBooking.customer.lastname,
        "email": newBooking.customer.email,
        "phone": newBooking.customer.phone
      }
    }
    )
    const bookingID = response.data.insertedId
    setBookingId(bookingID)

  }

  const openModal = () => {
    const modal = document.getElementById('my_modal_4') as HTMLDialogElement
    if (modal) {
      modal.showModal()
    }
  }
  const formControl = () => {
    if (createCustomerInput.name && createCustomerInput.email && createCustomerInput.lastname && createCustomerInput.phone) {
      setFieldsFilled(true)
    } else {
      setFieldsFilled(false)
    }
  }


  useEffect(() => {
    formControl()
  }, [createCustomerInput.name, createCustomerInput.email, createCustomerInput.lastname, createCustomerInput.phone])

  return (
    <div className='contact-info min-h-screen mt-16 pt-20 pb-44 flex flex-col items-center gap-10'>
      <h1 className='text-neutral-50'>Your details</h1>
      <div className='contact-form w-full max-w-lg flex flex-col gap-6 px-10 py-5 rounded-lg'>
        <div>
          <span className="label-text text-neutral-50">First name *</span>
          <input type="text" required name="name" value={createCustomerInput.name} onChange={handleNameChange} className="input input-bordered w-full max-w-full mt-2" />
        </div>
        <div>
          <span className="label-text text-neutral-50">Last name *</span>
          <input type="text" required name="lastname" value={createCustomerInput.lastname} onChange={handleNameChange} className="input input-bordered w-full max-w-full mt-2" />
        </div>
        <div>
          <span className="label-text text-neutral-50">Email *</span>
          <input type="text" required name="email" value={createCustomerInput.email} onChange={handleNameChange} className="input input-bordered w-full max-w-full mt-2" />
        </div>
        <div>
          <span className="label-text text-neutral-50">Phone *</span>
          <input name="phone" type= "tel" required value={createCustomerInput.phone} onChange={handleNameChange} className="input textarea-bordered w-full max-w-full mt-2"/>
        </div>

        <button onClick={(e) => saveContextAndSend(e)} disabled={!fieldsFilled} className="btn w-full self-center px-8 bg-primary hover:bg-neutral-50 text-neutral-50 hover:text-primary border-primary">Review details</button>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg">Booking confirmation</h3>
            <p>{`please make a note of your booking ID for cancellations or changes ${bookingId}`}</p>
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
        </dialog>
      </div>
    </div>
  )
}

export default UserContactInfo