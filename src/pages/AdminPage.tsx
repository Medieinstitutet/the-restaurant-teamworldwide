import { useState, useEffect } from 'react'
import { IReceivedBookings } from '../models/Booking'
import axios from 'axios'

import React from 'react'

const AdminPage = () => {

  const [bookings, setBookings] = useState<IReceivedBookings[]>([]);
  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const response = await axios.get<IReceivedBookings[]>("https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c6199912ebb6ed53265ac6/");
        const allBookings = response.data;
        setBookings(allBookings);
        console.log(allBookings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllBookings();
  }, [])

 const deleteBooking = async (id: string) => {
   try {
    await axios.delete(`https://school-restaurant-api.azurewebsites.net/booking/restaurant/${id}`);
    setBookings(bookings.filter(booking => booking._id !== id));
   } catch (error) {
    console.log(error)
   }
 }

 const editBooking = () => {
  
 }

 
  return (
    <div className='mt-16 min-h-screen'>
      <table className='min-w-full table-auto'>
        <thead>
          <tr>
            <th className='px-5 py-2'></th>
            <th className='px-5 py-2'></th>
            <th className='px-5 py-2'>Booking ID</th>
            <th className='px-5 py-2'>Date</th>
            <th className='px-5 py-2'>Time</th>
            <th className='px-5 py-2'>Number of Guests</th>
            <th className='px-5 py-2'>Customer ID</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} className='border-t'>
              <td className='px-5 py-2'>
                <button onClick={() => deleteBooking(booking._id)}>delete</button>
              </td>
              <td className='px-5 py-2'>
                <button onClick={() => editBooking()}>Edit</button>
              </td>
              <td className='px-5 py-2'>{booking._id}</td>
              <td className='px-5 py-2'>{booking.date}</td>
              <td className='px-5 py-2'>{booking.time}</td>
              <td className='px-5 py-2 text-center'>{booking.numberOfGuests}</td>
              <td className='px-5 py-2'>{booking.customerId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage
