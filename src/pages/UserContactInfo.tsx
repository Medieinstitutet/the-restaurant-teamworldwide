import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { NewCustomer } from '../models/Customer';
import { UserInputContext } from '../contexts/userInputs';
import { Link } from 'react-router-dom';


const UserContactInfo = () => {

  const [currentCapacity, setCurrentCapacity] = useState()
  const [createCustomerInput, setCreateCustomerInput] = useState<NewCustomer>(new NewCustomer("", "", "", ""))
  const [customerID, setCustomerID] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [fieldsFilled, setFieldsFilled] = useState(false)

  const { newBooking, addCustomerDetails } = useContext(UserInputContext)


  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateCustomerInput({ ...createCustomerInput, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("logging submit")
    addCustomerDetails(createCustomerInput.name, createCustomerInput.lastname, createCustomerInput.email, createCustomerInput.phone)
  }

  const openModal = () => {
    const modal = document.getElementById('my_modal_4') as HTMLDialogElement
    if (modal) {
      modal.showModal()
    }
  }

  const consoleLog = () => {
    console.log("checking checking")
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
    <div className='contact min-h-screen mt-16 pt-20 pb-44 flex flex-col items-center gap-10'>
      <h1 className='text-neutral-50'>Your details</h1>
      <form onSubmit={handleSubmit} className='contact-form w-full max-w-lg flex flex-col gap-6 px-10 py-5 rounded-lg'>
        <div>
          <span className="label-text">First name *</span>
          <input type="text" required name="name" value={createCustomerInput.name} onChange={handleNameChange} className="input input-bordered w-full max-w-full mt-2" />
        </div>
        <div>
          <span className="label-text">Last name</span>
          <input type="text" required name="lastname" value={createCustomerInput.lastname} onChange={handleNameChange} className="input input-bordered w-full max-w-full mt-2" />
        </div>
        <div>
          <span className="label-text">Email</span>
          <input type="text" required name="email" value={createCustomerInput.email} onChange={handleNameChange} className="input input-bordered w-full max-w-full mt-2" />
        </div>
        <div>
          <span className="label-text">Phone *</span>
          <input name="phone" type= "tel" required value={createCustomerInput.phone} onChange={handleNameChange} className="textarea textarea-bordered w-full max-w-full mt-2"/>
        </div>

        <button disabled={!fieldsFilled} className="btn w-full self-center px-8 bg-primary hover:bg-neutral-50 text-neutral-50 hover:text-primary border-primary" onClick={() => openModal()}>Review details</button>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg">Your booking details</h3>
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
                <button onClick={() => consoleLog()} className="btn mx-4">Submit</button>
              </form>
            </div>
          </div>
        </dialog>
      </form>
    </div>
  )
}

export default UserContactInfo