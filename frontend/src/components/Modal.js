
import React, { useState } from 'react';

const Modal = ({ selectedHotel }) => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const handleClose = () => {
    document.getElementById('hotelModal').style.display = 'none';
  };

  return (
    <div id="hotelModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2>{selectedHotel}</h2>
        <div className="modal-body">
          <h3>Most popular facilities</h3>
          <div className="facilities">
            <span>Free WiFi</span>
            <span>Free parking</span>
            <span>Room service</span>
            <span>Family rooms</span>
          </div>
          <h3>Availability</h3>
          <p>Select dates to see this property's availability and prices</p>
          <div className="date-selection">
            <input type="text" placeholder="Check-in date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
            <input type="text" placeholder="Check-out date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
            <button id="searchAvailability">Search</button>
          </div>
          <div className="availability">
            <table>
              <thead>
                <tr>
                  <th>Room type</th>
                  <th>Number of guests</th>
                  <th>Show prices</th>
                </tr>
              </thead>
              <tbody id="roomAvailability">
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
