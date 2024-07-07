import React, { useState } from 'react';

const Modal = ({ selectedHotel }) => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const handleClose = () => {
    document.getElementById('hotelModal').style.display = 'none';
  };

};

export default Modal;