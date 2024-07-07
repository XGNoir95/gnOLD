import React from 'react';

const Explore = () => {
  return (
    <section id="explore">
      <div id="explore-heading">
        <h2>Explore Bangladesh</h2>
        <p>Plan your next adventure to stunning destinations.</p>
      </div>
      <div className="row">
        <div
          className="pic-container"
          style={{ backgroundImage: "url('images/cox.jpg')" }}
          onClick={() => window.location.href='beach.html'}
        >
          <h3>&nbsp;Beach Bonanza: 3-Day Tropical Adventure in Cox's Bazar</h3>
        </div>
        <div
          className="pic-container"
          style={{ backgroundImage: "url('images/haor.jpeg')" }}
          onClick={() => window.location.href='bird.html'}
        >
          <h3>&nbsp;Birdwatcher's Bliss: 3-Day Adventure in Tanguar Haor</h3>
        </div>
      </div>
      <div className="row">
        <div
          className="pic-container1"
          style={{ backgroundImage: "url('images/rangamati.jpg')" }}
          onClick={() => window.location.href='marine.html'}
        >
          <h3>Marine Magic: 7-Day Coastal Adventure in Cox's Bazar</h3>
        </div>
        <div
          className="pic-container1"
          style={{ backgroundImage: "url('images/bandarban.jpg')" }}
        >
          <h3>Valley of Dreams: Discover the Beauty of Bandarban</h3>
        </div>
        <div
          className="pic-container1"
          style={{ backgroundImage: "url('images/sajek.jpeg')" }}
        >
          <h3>Clouds and Peaks: Heights of Sajek</h3>
        </div>
      </div>
    </section>
  );
};

export default Explore;
