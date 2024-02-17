import { useState, useEffect, ChangeEvent, useContext } from "react";
import { EditedBooking, IReceivedBookings } from "../models/Booking";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import {
  UserInputContext,
} from "../contexts/userInputs";
import { checkForAvailability } from "../helperfunctions/checkforavailbility";
import { API_URL, EDIT_A_BOOKING, GET_ALL_BOOKINGS, RESTAURANT_ID } from "../constants/constants";

const AdminPage = () => {
  const [bookings, setBookings] = useState<IReceivedBookings[]>([]);
  const [editedBooking, setEditedBooking] = useState<EditedBooking>(
    new EditedBooking("", RESTAURANT_ID, "", "", 1, "")
  );
  const [enableEdit, setEnableEdit] = useState(false);
  const [newDate, setNewDate] = useState<Dayjs>(dayjs("2022-04-17"));
  const [newDateFormatted, setnewDateFormatted] = useState("");
  const [fullyBookedAtSix, setFullyBookedAtSix] = useState(false)
  const [fullyBookedAtNine, setFullyBookedAtNine] = useState(false)
  const [enableDateChange, setEnableDateChange]= useState(false)


  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const response = await axios.get<IReceivedBookings[]>(
          ` ${API_URL}${GET_ALL_BOOKINGS}${RESTAURANT_ID}`
        );
        const allBookings = response.data;
        setBookings(allBookings);
        console.log(allBookings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllBookings();
  }, []);


  const deleteBooking = async (id: string) => {
    try {
      await axios.delete(
        `https://school-restaurant-api.azurewebsites.net/booking/delete/${id}`
      );
      setBookings(bookings.filter((booking) => booking._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(editedBooking)

    if(fullyBookedAtNine && editedBooking.time === "21:00") {
      alert("We are fully booked at 21:00 this day, please choose another time or date")
      return
    }
    if(fullyBookedAtSix && editedBooking.time === "18:00") {
      alert("We are fully booked at 18:00 this day, please choose another time or date")
      return
    }

    const updateBooking = async () => {
      try {
        await axios.put<IReceivedBookings>(
          `${API_URL}${EDIT_A_BOOKING}${editedBooking._id}`,
          {
            id: editedBooking._id,
            restaurantId: RESTAURANT_ID,
            date: editedBooking.date,
            time: editedBooking.time,
            numberOfGuests: editedBooking.numberOfGuests,
            customerId: editedBooking.customerId,
          }
        )
        console.log("update booking run");
        const bookingUpdated = bookings.map((booking) => {
        if(booking._id === editedBooking._id) {
          return editedBooking
        } return booking
        })
        setBookings(bookingUpdated)
      } catch (error) {
        error
      }
    }
    updateBooking()
  }, [editedBooking])


  const handleDatechange = (newDate: Dayjs | null, _id: string) => {
    if (newDate) {
      const newDateToISO = newDate?.format('YYYY-MM-DD')
      const bookingToEdit = bookings.find((booking) => booking._id === _id)
      if (bookingToEdit)
        setEditedBooking(new EditedBooking(bookingToEdit?._id, bookingToEdit?.restaurantId, newDateToISO, bookingToEdit?.time, bookingToEdit?.numberOfGuests, bookingToEdit?.customerId))
    }
  }

  const handleTimechange = (_id: string, selectedValue: string) => {
    console.log("selectedvalue" + selectedValue)
    let newTime = selectedValue
    const bookingToEdit = bookings.find((booking) => booking._id === _id)
    if (bookingToEdit)
      setEditedBooking(new EditedBooking(bookingToEdit?._id, bookingToEdit?.restaurantId, bookingToEdit.date, newTime, bookingToEdit?.numberOfGuests, bookingToEdit?.customerId))
  }

  const handleNumberOfPeopleChange = (_id: string, selectedValue: string) => {
    let newNumberOfPeople = +selectedValue
    const bookingToEdit = bookings.find((booking) => booking._id === _id)
    if (bookingToEdit)
      setEditedBooking(new EditedBooking(bookingToEdit?._id, bookingToEdit?.restaurantId, bookingToEdit.date, bookingToEdit.time, newNumberOfPeople, bookingToEdit?.customerId))
  }


  useEffect(() => {
    const updateCapacity = async (id: string) => {

      const bookingsAt18and21 = checkForAvailability(
        editedBooking.date, bookings
      )
      const bookingsAt18 = bookingsAt18and21[0]
      const bookingsAt21 = bookingsAt18and21[1]
      console.log("bookings at 18 on current date = " + bookingsAt18.length)
      console.log("bookings at 21 on current date = " + bookingsAt21.length)

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
    updateCapacity(editedBooking._id)
  }), [editedBooking.date]







  const toggleEnableEdit = (id: string) => {
    setEnableEdit(!enableEdit);
  };

  return (
    <div className="mt-16 min-h-screen bg-white">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-5 py-2"></th>
            <th className="px-5 py-2"></th>
            <th className="px-5 py-2">Booking ID</th>
            <th className="px-5 py-2">Date</th>
            <th className="px-5 py-2">Time</th>
            <th className="px-5 py-2">Number of Guests</th>
            <th className="px-5 py-2">Customer ID</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} className="border-t">
              <td className="px-5 py-2">
                <button onClick={() => deleteBooking(booking._id)}>
                  delete
                </button>
              </td>
              {/* hittar inte editBooking */}
              {/* <td className='px-5 py-2'>
                <button onClick={() => editBooking()}>Edit</button>
              </td> */}
              {/* <td className='px-5 py-2'>{booking._id}</td>
              <td className='px-5 py-2'>{booking.date}</td>
              <td className='px-5 py-2'>{booking.time}</td>
              <td className='px-5 py-2 text-center'>{booking.numberOfGuests}</td>
              <td className='px-5 py-2'>{booking.customerId}</td> */}
              <td className="px-5 py-2">
                <button
                  id="edit-button"
                  onClick={() => toggleEnableEdit(booking._id)}
                >
                  {enableEdit ? "Save" : "Edit"}
                </button>
              </td>
              <td className="px-5 py-2">{booking._id}</td>
              <td className="px-5 py-2">
                {/* <input type="text" name="date" value={booking.date} onChange={handleSelectChange}/> */}
                <DatePicker
                  disabled={!enableEdit}
                  name="date"
                  value={dayjs(booking.date)}
                  onChange={(newDate) => handleDatechange(newDate, booking._id)}
                />
              </td>
              <td className="px-5 py-2 flex justify-center gap-1">
                <select
                  disabled={enableDateChange}
                  className="select select-bordered w-max max-w-xs font"
                  name="time"
                  value={booking.time}
                  onChange={(e) =>
                    handleTimechange(booking._id, e.target.value)
                  }
                >
                  <option value={"18:00"}>18:00</option>
                  <option value={"21:00"}>21:00</option>
                </select>
              </td>
              <td className="px-5 py-2 text-center">
                <select
                  disabled={!enableEdit}
                  className="select select-bordered w-max max-w-xs font"
                  name="numberOfGuests"
                  value={booking.numberOfGuests}
                  onChange={(e) =>
                    handleNumberOfPeopleChange(booking._id, e.target.value)
                  }
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </select>
              </td>
              <td className="px-5 py-2">{booking.customerId}</td>
            </tr>
          ))}
          {/* </tr> */}
          {/* )} */}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
