import React, { useState, useEffect } from 'react';
import './HolidayPage.css';

const HolidayPage = () => {
  const initialFilters = {
    range: 20000,
    duration: 0,
    packageName: '',
    destination: '',
  };

  const packages = [
    {
      id: 1,
      image: 'beach.jpg',
      name: "Beach Bonanza",
      description: "Experience the serene beauty of Cox's Bazar's beaches for 3 days and 2 nights.",
      price: 7000,
      duration: 3,
      destination: "Cox's Bazar",
    },
    {
      id: 2,
      image: 'sunset.jpg',
      name: "Sunset Splendor",
      description: "Witness the majestic sunsets over the horizon for 5 days and 4 nights.",
      price: 9000,
      duration: 5,
      destination: "Cox's Bazar",
    },
    {
      id: 3,
      image: 'marine.jpg',
      name: "Marine Magic",
      description: "Explore the adventurous side of Cox's Bazar with guided tours for 7 days and 6 nights.",
      price: 18000,
      duration: 7,
      destination: "Cox's Bazar",
    },
    {
      id: 4,
      image: 'band1.png',
      name: "Misty Mountains",
      description: "Experience the serene beauty of Bandarban for 3 days and 2 nights.",
      price: 8000,
      duration: 3,
      destination: "Bandarban",
    },
    {
      id: 5,
      image: 'saj2.jpg',
      name: "Valley of Dreams",
      description: "Witness the majestic sunsets over Sajek Valley for 5 days and 4 nights.",
      price: 10000,
      duration: 5,
      destination: "Sajek",
    },
    {
      id: 6,
      image: 'saj1.jpg',
      name: "Clouds and Peaks",
      description: "Explore the adventurous side of Sajek Valley with guided tours for 7 days and 6 nights.",
      price: 18000,
      duration: 7,
      destination: "Sajek",
    },
    {
      id: 7,
      image: 'tang1.jpg',
      name: "Birdwatcher's Bliss",
      description: "Witness the majestic sunsets over Tanguar Haor for 3 days and 2 nights.",
      price: 8000,
      duration: 3,
      destination: "Tanguar Haor",
    },
    {
      id: 8,
      image: 'syl1.jpg',
      name: "Nature's Haven",
      description: "Experience the serene beauty of Tanguar Haor's wetlands for 5 days and 4 nights.",
      price: 10000,
      duration: 5,
      destination: "Sylhet",
    },
  ];

  const [filters, setFilters] = useState(initialFilters);
  const [filteredPackages, setFilteredPackages] = useState(packages);

  const resetFilters = () => {
    setFilters(initialFilters);
    setFilteredPackages(packages);
  };

  const updateFilters = (name, value) => {
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  const applyFilters = (filters) => {
    const filteredPackages = packages.filter(pkg => {
      return (
        (pkg.price <= filters.range) &&
        (filters.duration === 0 || pkg.duration === filters.duration) &&
        (filters.packageName === '' || pkg.name.toLowerCase().includes(filters.packageName.toLowerCase())) &&
        (filters.destination === '' || pkg.destination.toLowerCase().includes(filters.destination.toLowerCase()))
      );
    });

    setFilteredPackages(filteredPackages);
  };

  useEffect(() => {
    setFilteredPackages(packages);
  }, []);

  return (
    <div className="holiday-page">
      <div className="sidebar">
        <button className="reset-button" onClick={resetFilters}>Reset Filters</button>
        <h3>Filter</h3><br />
        <label htmlFor="range">Price Range: <span id="priceValue">{filters.range}</span></label><br />
        <input
          type="range"
          id="range"
          name="range"
          min="5000"
          max="20000"
          value={filters.range}
          onChange={(e) => updateFilters('range', parseInt(e.target.value))}
        /><br /><br />

        <label htmlFor="duration">Duration:</label>
        <select
          id="duration"
          name="duration"
          value={filters.duration}
          onChange={(e) => updateFilters('duration', parseInt(e.target.value))}
        >
          <option value="0">Any</option>
          <option value="3">3 days</option>
          <option value="5">5 days</option>
          <option value="7">7 days</option>
        </select><br /><br />

        <label htmlFor="packageName">Package Name:</label>
        <input
          type="text"
          id="packageName"
          name="packageName"
          value={filters.packageName}
          onChange={(e) => updateFilters('packageName', e.target.value)}
        /><br /><br />

        <label htmlFor="destination">Destination:</label>
        <select
          id="destination"
          name="destination"
          value={filters.destination}
          onChange={(e) => updateFilters('destination', e.target.value)}
        >
          <option value="">Any</option>
          <option value="Cox's Bazar">Cox's Bazar</option>
          <option value="Sajek">Sajek</option>
          <option value="Tanguar Haor">Tanguar Haor</option>
          <option value="Sylhet">Sylhet</option>
          <option value="Bandarban">Bandarban</option>
        </select><br /><br />

        <button className="apply-button" onClick={() => applyFilters(filters)}>Apply Filters</button>
      </div>

      <div>
        <h1>Exciting Holiday Packages</h1>
        <p>Discover the best travel deals and explore stunning destinations.</p>
        <div className="tour-packages">
          {filteredPackages.length > 0 ? (
            filteredPackages.map(pkg => (
              <div
                key={pkg.id}
                className="tour-package"
                style={{ backgroundImage: `url(images/${pkg.image})` }}
              >
                <h3>{pkg.name}</h3>
                <p>{pkg.description}</p>
                <p>Price: Tk{pkg.price}</p>
              </div>
            ))
          ) : (
            <div className="no-results">
              <h3>Sorry, no tour packages match your criteria.</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HolidayPage;