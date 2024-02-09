import React, { useState } from 'react'
import axios from 'axios';
import { NewCustomer } from '../models/Customer';


const BookingPage = () => {

  const [currentCapacity, setCurrentCapacity] = useState()
  const [createCustomerInput, setCreateCustomerInput] = useState<NewCustomer>(new NewCustomer("", "", "", ""))
  const [customerID, setCustomerID] = useState("")


  const restaurantID = "65c6199912ebb6ed53265ac6"

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(createCustomerInput)
    axios.post("https://school-restaurant-api.azurewebsites.net/booking/create", {
      /*       "restaurantId": {restaurantID},
            "date": "2022-01-01",
            "time": "18:00",
            "numberOfGuests": 4,
            "customer": { */
      "name": createCustomerInput.name,
      "lastname": createCustomerInput.lastname,
      "email": createCustomerInput.email,
      "phone": createCustomerInput.phone,
      /*  } */
    }).then(function (response) {
      console.log(response);
      setCustomerID(response.data)
      console.log("customer id" + customerID)
    })
      .catch(function (error) {
        console.log(error);
      })

  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateCustomerInput({ ...createCustomerInput, [e.target.name]: e.target.value })
  }



  return (
    <main className='bg-accent h-screen p-4'>
      <form onSubmit={handleSubmit} className='mt-6 ml-6 flex space-x-6'>
        <input name="name" value={createCustomerInput.name} onChange={handleNameChange} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        <input name="lastname" value={createCustomerInput.lastname} onChange={handleNameChange} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        <input name="email" value={createCustomerInput.email} onChange={handleNameChange} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        <input name="phone" value={createCustomerInput.phone} onChange={handleNameChange} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        <button className="btn btn-alert mt-8 ml-10">Click here to fetch reservations</button>
      </form>


    </main>

  )
}

export default BookingPage