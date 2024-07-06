import React, { useState } from 'react';
import './HotelPage.css'; 

const hotels = [
  {
    name: "Long Beach Hotel Cox's Bazar",
    price: "BDT 8,193/Night",
    location: "14 Kalatoli, Hotel-Motel Zone, Cox's Bazar, Bangladesh",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/283183777.jpg?k=899b1542446c88268f790cf9968ddeffe42a7b24c7b228069de09413d5275822&o&hp=1&fbclid=IwAR3XkptKk1NRszdVAMGSRiVyrIeLePTwQDlVXhsHgRzF7RpvwfsfESi0N4w ",
    stars: "&#9733;&#9733;&#9733;&#9733;&#9733;",
    discount: "19% OFF",
    discountPrice: "BDT 8,193",
    rooms: ["Single", "Double", "Suite"]
  },
  {
    name: "Tanguar Avijatrik: Luxury Houseboat at Haor",
    price: "BDT 6,500/Night",
    location: "Tanguar Haor, Sunamganj, Bangladesh",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSHE7pLTjrgibyOpPLqX1TAPI0GdA381_lqKA&s&fbclid=IwAR3G4-f2nvnZBxa6t_LdgMI0hDYKqt5Od625PZ-KV7XtlB94Q2SOUCUNn8s",
    stars: "&#9733;&#9733;&#9733;&#9733;&#9733;",
    discount: "20% OFF",
    discountPrice: "BDT 6,500",
    rooms: ["Single", "Double", "Family"]
  },
  {
    name: "Lakeshore Resort:Rangamati",
    price: "BDT 6,000/Night",
    location: "Rangamati, Chittagong Hill Tracts, Bangladesh",
    image: "https://api.sharetrip.net/api/v1/hotel/image?key=HyANbffVjkBh1mA2CJLuNFZlI6UkKrgAbXWPt8bqt5XudxSGJg/auh/IeYO9o63FWll2h/tvGridd5Ar9ZmNcGBHCzOR8bvEGn24mVxGMsxV1h7O7MvuzkfzN62hzXC6muvqrg2G9udtXjGhTgVsRA==",
    stars: "&#9733;&#9733;&#9733;&#9733;",
    discount: "20% OFF",
    discountPrice: "BDT 6,000",
    rooms: ["Single", "Double", "Deluxe"]
  },
  {
    name: "Meghpolli Resort:Sajek",
    price: "BDT 7,200/Night",
    location: "Sajek Valley, Rangamati, Bangladesh",
    image: " https://static.meghpolli.com/meghpolli/static/assets/img/Bashonti-2.jpg",
    stars: "&#9733;&#9733;&#9733;&#9733;&#9733;",
    discount: "20% OFF",
    discountPrice: "BDT 7,200",
    rooms: ["Single", "Double", "Executive"]
  }
];
const HotelPage = ({ navigateTo }) => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredHotels, setFilteredHotels] = useState(hotels);

  const handleSearch = (event) => {
    event.preventDefault();
    const searchValue = searchInput.trim().toLowerCase();
    const filteredHotels = hotels.filter(hotel =>
      hotel.name.toLowerCase().includes(searchValue)
    );
    setFilteredHotels(filteredHotels);
  };

  return (
    <div className="hotel-page">
      <header>
       
      </header>
      <main>
        <section className="welcome-section">
          <h2>Search hotels.</h2>
          <p>Explore luxurious hotels and accommodations.</p>
        </section>
        <section className="search-section">
          <form id="searchForm" onSubmit={handleSearch}>
            <div className="form-group">
              <label htmlFor="to">Hotel Name</label>
              <input
                type="text"
                id="to"
                placeholder="Hotel Name"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button type="submit">Search</button>
            </div>
          </form>
          <div id="searchResults" className="search-results">
            {filteredHotels.length > 0 ? (
              filteredHotels.map((hotel, index) => (
                <div key={index} className="hotel-container">
                  <div className="hotel-image">
                    <img src={hotel.image} alt={hotel.name} />
                  </div>
                  <div className="hotel-details">
                    <h3>{hotel.name}</h3>
                    <div className="stars" dangerouslySetInnerHTML={{ __html: hotel.stars }} />
                    <p className="location">{hotel.location}</p>
                    <div className="price-info">
                      <p className="discount-price">{hotel.discountPrice}/Night <span className="discount">{hotel.discount}</span></p>
                      <p className="price-includes">*Price includes VAT & Tax</p>
                    </div>
                    <button className="book-now" onClick={() => navigateTo('details', hotel)}>BOOK NOW</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No hotels found.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HotelPage;