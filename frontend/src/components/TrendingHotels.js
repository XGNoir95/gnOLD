import React from 'react';

const TrendingHotels = () => {
  return (
    <section id="trend">
      <div id="trend_heading">
        <h2>Trending Hotels</h2>
        <p>Luxurious or budget-friendly hotels, villas, or resorts.</p>
      </div>

      <div className="hotel-container">
        <div className="hotel-image">
          <img src="/images/cox.jpg" alt="Long Beach Hotel Cox's Bazar" />
        </div>
        <div className="hotel-details">
          <h3>Long Beach Hotel Cox's Bazar</h3>
          <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <p className="location">14 Kalatoli, Hotel-Motel Zone, Cox's Bazar, Bangladesh</p>
          <div className="price-info">
            <p>Starts from <span className="old-price">BDT 10,129</span>/Night</p>
            <p className="discount-price">BDT 8,193/Night <span className="discount">19% OFF</span></p>
            <p className="price-includes">*Price includes VAT & Tax</p>
          </div>
          <button className="book-now" data-hotel="Long Beach Hotel Cox's Bazar">BOOK NOW</button>
        </div>
      </div>

      <div className="hotel-container">
        <div className="hotel-image">
          <img src="/images/tang3.jpeg" alt="Tanguar Haor Resort" />
        </div>
        <div className="hotel-details">
          <h3>Tanguar Avijatrik: Luxury Houseboat at Haor</h3>
          <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <p className="location">Tanguar Haor, Sunamganj, Bangladesh</p>
          <div className="price-info">
            <p>Starts from <span className="old-price">BDT 8,000</span>/Night</p>
            <p className="discount-price">BDT 6,500/Night <span className="discount">20% OFF</span></p>
            <p className="price-includes">*Price includes VAT & Tax</p>
          </div>
          <button className="book-now" data-hotel="Tanguar Avijatrik: Luxury Houseboat at Haor">BOOK NOW</button>
        </div>
      </div>

      <div className="hotel-container">
        <div className="hotel-image">
          <img src="/images/hotel2.jpg" alt="Rangamati Resort" />
        </div>
        <div className="hotel-details">
          <h3>Lakeshore Resort: Rangamati</h3>
          <div className="stars">&#9733;&#9733;&#9733;&#9733;</div>
          <p className="location">Rangamati, Chittagong Hill Tracts, Bangladesh</p>
          <div className="price-info">
            <p>Starts from <span className="old-price">BDT 7,500</span>/Night</p>
            <p className="discount-price">BDT 6,000/Night <span className="discount">20% OFF</span></p>
            <p className="price-includes">*Price includes VAT & Tax</p>
          </div>
          <button className="book-now" data-hotel="Lakeshore Resort: Rangamati">BOOK NOW</button>
        </div>
      </div>

      <div className="hotel-container">
        <div className="hotel-image">
          <img src="/images/saj2.jpg" alt="Sajek Resort" />
        </div>
        <div className="hotel-details">
          <h3>Meghpolli Resort: Sajek</h3>
          <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          <p className="location">Sajek Valley, Rangamati, Bangladesh</p>
          <div className="price-info">
            <p>Starts from <span className="old-price">BDT 9,000</span>/Night</p>
            <p className="discount-price">BDT 7,200/Night <span className="discount">20% OFF</span></p>
            <p className="price-includes">*Price includes VAT & Tax</p>
          </div>
          <button className="book-now" data-hotel="Meghpolli Resort: Sajek">BOOK NOW</button>
        </div>
      </div>
    </section>
  );
};

export default TrendingHotels;