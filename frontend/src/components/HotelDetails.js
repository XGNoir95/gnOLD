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
      <div className="hotel-extra-details">
        <p><strong>Price:</strong> {hotel.price}</p>
        <p><strong>Discount Price:</strong> {hotel.discountPrice} <span>{hotel.discount}</span></p>
        <p><strong>Rating:</strong> <span dangerouslySetInnerHTML={{ __html: hotel.stars }} /></p>
        <p><strong>Description:</strong> {hotel.description}</p>
        <p><strong>Amenities:</strong> {hotel.amenities.join(', ')}</p>
        <p><strong>Contact:</strong> {hotel.contact}</p>
      </div>
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
