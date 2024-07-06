import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import VideoBackground from './components/VideoBackground';
import Explore from './components/Explore';
import TrendingHotels from './components/TrendingHotels';
import Modal from './components/Modal';
import HolidayPage from './components/HolidayPage';
import HotelPage from './components/HotelPage';
import HotelDetails from './components/HotelDetails';
import BookingForm from './components/BookingForm';
import Login from './components/Login';
import Register from './components/Register';
import './styles.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setCurrentPage('home');
    } else {
      setCurrentPage('login');
    }
  }, []);

  const navigateTo = (page, hotel = null, room = '') => {
    setSelectedHotel(hotel);
    setSelectedRoom(room);
    setCurrentPage(page);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentPage('login');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'login':
        return <Login navigateTo={navigateTo} />;
      case 'register':
        return <Register navigateTo={navigateTo} />;
      case 'home':
        return (
          <>
            <VideoBackground />
            <Explore />
            <TrendingHotels navigateTo={navigateTo} />
            <Modal />
          </>
        );
      case 'holiday':
        return <HolidayPage />;
      case 'hotel':
        return <HotelPage navigateTo={navigateTo} />;
      case 'details':
        return selectedHotel && (
          <HotelDetails
            hotel={selectedHotel}
            navigateTo={navigateTo}
            setSelectedRoom={setSelectedRoom}
          />
        );
      case 'booking':
        return selectedHotel && selectedRoom && (
          <BookingForm hotel={selectedHotel} room={selectedRoom} />
        );
      case 'why':
        return <div>Why WanderHub?</div>;
      case 'faq':
        return <div>FAQ</div>;
      case 'about':
        return <div>About</div>;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div>
      {currentPage !== 'login' && <Header onNavClick={navigateTo} onLogout={handleLogout} />}
      {renderContent()}
    </div>
  );
};

export default App;
