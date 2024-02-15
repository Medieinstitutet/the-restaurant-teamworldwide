import { useState, useEffect, ChangeEvent, useContext } from "react";
import { EditedBooking, IReceivedBookings } from "../models/Booking";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import {
  CheckForAvailabilityContext,
  UserInputContext,
} from "../contexts/userInputs";
import { checkForAvailability } from "../helperfunctions/checkforavailbility";

const AdminPage = () => {
  const [bookings, setBookings] = useState<IReceivedBookings[]>([]);
  const [editedBooking, setEditedBooking] = useState<EditedBooking>(
    new EditedBooking("", "65c6199912ebb6ed53265ac6", "", "", 1, "")
  );
  const [enableEdit, setEnableEdit] = useState(false);
  const [newDate, setNewDate] = useState<Dayjs | null>(dayjs("2022-04-17"));
  const [newDateFormatted, setnewDateFormatted] = useState("");
  const [togglingDate, setTogglingDate] = useState(false);

  const {
    toggleFullyBookedAtSix,
    toggleFullyBookedAtNine,
    fullyBookedAtSix,
    fullyBookedAtNine,
  } = useContext(CheckForAvailabilityContext);

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const response = await axios.get<IReceivedBookings[]>(
          "https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c6199912ebb6ed53265ac6/"
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
        `https://school-restaurant-api.azurewebsites.net/booking/restaurant/${id}`
      );
      setBookings(bookings.filter((booking) => booking._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChange = (
    id: string,
    customerId: string,
    date: string,
    time: string,
    numberOfGuests: number,
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.name === "time") {
      setEditedBooking(
        new EditedBooking(
          id,
          "65c6199912ebb6ed53265ac6",
          date,
          e.target.value,
          numberOfGuests,
          customerId
        )
      );

      checkForAvailability(
        toggleFullyBookedAtNine,
        toggleFullyBookedAtSix,
        newDateFormatted
      );
      {
        fullyBookedAtSix
          ? alert(newDateFormatted + "18:00 fully booked")
          : alert(newDateFormatted + "18:00 available");
      }
      {
        fullyBookedAtNine
          ? alert(newDateFormatted + "21:00 fully booked")
          : alert(newDateFormatted + "21:00 available");
      }
    } else if (e.target.name === "numberOfGuests") {
      let numberOfGuests = +e.target.value;
      setEditedBooking(
        new EditedBooking(
          id,
          "65c6199912ebb6ed53265ac6",
          date,
          time,
          numberOfGuests,
          customerId
        )
      );
    }

    setBookings(
      bookings.map((booking) => {
        if (booking._id === id) {
          return { ...booking, [e.target.name]: e.target.value };
        } else {
          return booking;
        }
      })
    );
  };

  // useEffect(() => {
  //   const newDateIsoString = newDate?.toISOString()
  //   setnewDateFormatted(dayjs(newDateIsoString).format('YYYY-MM-DD'));
  //   handleDateChange
  // }, [newDate])

  useEffect(() => {
    const newDateToISO = newDate?.toISOString();
    setnewDateFormatted(dayjs(newDateToISO).format("YYYY-MM-DD"));
    setTogglingDate(true);
    if (newDateFormatted) {
    }
  }, [newDate]);

  const handleDateChange = (
    date: string,
    id: string,
    customerId: string,
    time: string,
    numberOfGuests: number
  ) => {
    console.log(date);
    console.log(newDateFormatted);
    setEditedBooking(
      new EditedBooking(
        id,
        "65c6199912ebb6ed53265ac6",
        newDateFormatted,
        time,
        numberOfGuests,
        customerId
      )
    );
    setBookings(
      bookings.map((booking) => {
        if (booking._id === id) {
          return { ...booking, date: newDateFormatted };
        } else {
          return booking;
        }
      })
    );
    setEnableEdit(!enableEdit);
  };

  const updateBooking = async (id: string) => {
    if (editedBooking !== undefined) {
      await axios.put<IReceivedBookings>(
        `https://school-restaurant-api.azurewebsites.net/booking/update/${id}`,
        {
          id: id,
          restaurantId: "65c6199912ebb6ed53265ac6",
          date: editedBooking.date,
          time: editedBooking.time,
          numberOfGuests: editedBooking.numberOfGuests,
          customerId: editedBooking.customerId,
        }
      );
    }
    console.log("update booking has been run");
  };

  const toggleEnableEdit = (id: string) => {
    setEnableEdit(!enableEdit);
    if (enableEdit) {
      updateBooking(id);
      console.log(`booking with ${id} has been updated`);
    }
  };

  useEffect(() => {
    console.log(bookings);
  }, [enableEdit]);

  return (
    <div className="mt-16 min-h-screen">
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
                {togglingDate ? (
                  <button
                    id="edit-button"
                    onClick={() =>
                      handleDateChange(
                        newDateFormatted,
                        booking._id,
                        booking.customerId,
                        booking.time,
                        booking.numberOfGuests
                      )
                    }
                  >
                    {enableEdit ? "Save" : "Edit"}
                  </button>
                ) : (
                  <button
                    id="edit-button"
                    onClick={() => toggleEnableEdit(booking._id)}
                  >
                    {enableEdit ? "Save" : "Edit"}
                  </button>
                )}
              </td>
              <td className="px-5 py-2">{booking._id}</td>
              <td className="px-5 py-2">
                {/* <input type="text" name="date" value={booking.date} onChange={handleSelectChange}/> */}
                <DatePicker
                  disabled={!enableEdit}
                  name="date"
                  value={dayjs(booking.date)}
                  onChange={(newDate) => setNewDate(newDate)}
                />
              </td>
              <td className="px-5 py-2 flex justify-center gap-1">
                <select
                  disabled={!enableEdit}
                  className="select select-bordered w-max max-w-xs font"
                  name="time"
                  value={booking.time}
                  onChange={(e) =>
                    handleSelectChange(
                      booking._id,
                      booking.customerId,
                      booking.date,
                      booking.time,
                      booking.numberOfGuests,
                      e
                    )
                  }
                >
                  <option>18:00</option>
                  <option>21:00</option>
                </select>
              </td>
              <td className="px-5 py-2 text-center">
                <select
                  disabled={!enableEdit}
                  className="select select-bordered w-max max-w-xs font"
                  name="numberOfGuests"
                  value={booking.numberOfGuests}
                  onChange={(e) =>
                    handleSelectChange(
                      booking._id,
                      booking.customerId,
                      booking.date,
                      booking.time,
                      booking.numberOfGuests,
                      e
                    )
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
