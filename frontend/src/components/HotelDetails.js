import React, { useState } from 'react';

const HotelDetails = ({ hotel, navigateTo, setSelectedRoom }) => {
  const [selectedRoom, setRoom] = useState('');

  const handleRoomSelect = (event) => {
    setRoom(event.target.value);
    setSelectedRoom(event.target.value);
  };

  const handleNext = () => {
    navigateTo('booking', hotel, selectedRoom);
  };

  return (
    <div className="hotel-details">
      <h2>{hotel.name}</h2>
      <p>{hotel.location}</p>
      <img src={hotel.image} alt={hotel.name} />
      <div className="room-selection">
        <h3>Select a room</h3>
        <select value={selectedRoom} onChange={handleRoomSelect}>
          <option value="">Select a room type</option>
          {hotel.rooms.map((room, index) => (
            <option key={index} value={room}>{room}</option>
          ))}
        </select>
        <button onClick={handleNext} disabled={!selectedRoom}>Next</button>
      </div>
    </div>
  );
};

export default HotelDetails;