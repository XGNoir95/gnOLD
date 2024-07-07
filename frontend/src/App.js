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
        return (
          <section className="content-section">
            <h2>Why WanderHub?</h2>
            <ul>
              <li>Personalized travel experiences tailored to your preferences.</li>
              <li>Diverse destinations and accommodations to suit every traveler.</li>
              <li>Passionate about creating memorable journeys for adventurers.</li>
              <li>Commitment to seamless travel with dedicated support.</li>
            </ul>
          </section>
        );
      case 'faq':
        return (
          <section className="content-section">
            <h2>FAQ</h2>
            <ul>
              <li>What types of accommodations does WanderHub offer?</li>
              <li>How can I contact customer support for assistance?</li>
              <li>Do you provide travel insurance options?</li>
              <li>Can I modify or cancel my booking?</li>
            </ul>
          </section>
        );
      case 'about':
        return (
          <section className="content-section">
            <h2>About WanderHub</h2>
            <ul>
              <li>Connecting travelers with exceptional destinations worldwide.</li>
              <li>Driven by a passion for exploration and discovery.</li>
              <li>Creating lasting memories through curated travel experiences.</li>
              <li>Learn more about our mission to redefine travel.</li>
            </ul>
          </section>
        );
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div>
      {currentPage !== 'login' && currentPage !== 'register' && <Header onNavClick={navigateTo} onLogout={handleLogout} />}
      {renderContent()}
    </div>
  );
};

export default App;
