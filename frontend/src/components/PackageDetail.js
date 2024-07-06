import React, { useState, useEffect, useRef } from 'react';
import './PackageDetail.css';

const PackageDetail = ({ pkg }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const slides = [
    { image: '/images/saint.jpg' },
    { image: '/images/hotel.jpg' },
    { image: '/images/coxf1.jpg' },
    { image: '/images/tek.jpg' }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      handleNextSlide();
    }, 1000); 

    return () => {
      clearInterval(slideInterval);
    };
  }, [currentSlide]);

  const handleNextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const handlePreviousSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const slideWidth = sliderRef.current.clientWidth;
    sliderRef.current.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  }, [currentSlide]);

  return (
    <div className="package-detail">
      <header></header>

      <div className="slider-container" ref={sliderRef}>
        {slides.map((slide, index) => (
          <div key={index} className="slide" style={{ backgroundImage: `url(${slide.image})` }}></div>
        ))}
      </div>

      <div className="tour-details">
        <h2>{pkg.name} {pkg.duration}-Day Tour Package</h2>
        <div className="day">
          <h3>Day 1: Arrival and Beach Fun</h3>
          <p>Arrive in {pkg.destination} and check in at your hotel. Spend the afternoon enjoying the pristine beaches, take a dip in the sea, and relax under the sun. In the evening, enjoy a beachfront dinner with a mesmerizing sunset view.</p>
        </div>
        <div className="day">
          <h3>Day 2: Explore and Adventure</h3>
          <p>Start your day with a visit to Himchari National Park for a scenic hike and waterfall visit. After lunch, explore the local markets for souvenirs and enjoy some local delicacies. In the evening, take a boat ride on the Bay of Bengal.</p>
        </div>
        <div className="day">
          <h3>Day 3: Cultural Experience and Departure</h3>
          <p>Visit the {pkg.destination} Buddhist Monastery and learn about the local culture and history. After lunch, spend some leisure time on the beach before checking out from the hotel and departing for home.</p>
        </div>
      </div>

    </div>
  );
};

export default PackageDetail;
