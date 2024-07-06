import React, { useState } from 'react';

const BookingForm = ({ hotel, room }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [bookings, setBookings] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBooking = {
      hotel: hotel.name,
      room,
      name,
      age,
      phone,
    };
    setBookings([...bookings, newBooking]);
    setName('');
    setAge('');
    setPhone('');
  };

  const handleDelete = (index) => {
    const updatedBookings = bookings.filter((_, i) => i !== index);
    setBookings(updatedBookings);
  };

  const handleEdit = (index) => {
    const bookingToEdit = bookings[index];
    setName(bookingToEdit.name);
    setAge(bookingToEdit.age);
    setPhone(bookingToEdit.phone);
    handleDelete(index);
  };

  return (
    <div className="booking-form">
      <h2>Booking Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div className="booking-table">
        <h3>Bookings</h3>
        {bookings.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Hotel Name</th>
                <th>Room Type</th>
                <th>Name</th>
                <th>Age</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.hotel}</td>
                  <td>{booking.room}</td>
                  <td>{booking.name}</td>
                  <td>{booking.age}</td>
                  <td>{booking.phone}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No bookings yet.</p>
        )}
      </div>
    </div>
  );
};

export default BookingForm;