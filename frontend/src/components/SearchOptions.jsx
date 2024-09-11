import React from 'react';

const SearchOptions = ({
  searchTerm,
  setSearchTerm,
  selectedGenre,
  setSelectedGenre,
  selectedRating,
  setSelectedRating,
  selectedPlatform,
  setSelectedPlatform,
  selectedPrice,
  setSelectedPrice,
  genres,
  platforms,
}) => {
  return (
    <div className="mb-2 flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        placeholder="Search games..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full sm:w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-purple-800 bg-gray-100 text-black mb-2 sm:mb-6"
      />
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        className="w-full sm:w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-purple-800 bg-gray-100 text-black mb-2 sm:mb-6"
      >
        <option value="">All Genres</option>
        {genres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <select
        value={selectedRating}
        onChange={(e) => setSelectedRating(e.target.value)}
        className="w-full sm:w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-100 text-black mb-2 sm:mb-6"
      >
        <option value="">All Ratings</option>
        <option value="9">9 and above</option>
        <option value="8">8 and above</option>
        <option value="7">7 and above</option>
        <option value="6">6 and above</option>
        <option value="5">5 and above</option>
      </select>
      <select
        value={selectedPlatform}
        onChange={(e) => setSelectedPlatform(e.target.value)}
        className="w-full sm:w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-100 text-black mb-2 sm:mb-6"
      >
        <option value="">All Platforms</option>
        {platforms.map((platform, index) => (
          <option key={index} value={platform}>
            {platform}
          </option>
        ))}
      </select>
      <div className="mb-4 w-full sm:w-full">
        <label className="block mb-2 text-amber-400 font-bold text-sm">Max Price: ${selectedPrice}</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
          className="w-full h-4 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};

export default SearchOptions;
