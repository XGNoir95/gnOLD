import React, { useState, useEffect } from "react";
import Axios from "axios";

const AllGame = () => {
  const [data, setData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(300); // Set the max price according to your data
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const getData = async () => {
    try {
      const response = await Axios.get("http://localhost:1000/api/v1/sort-games");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData({ error: "Failed to fetch games data" });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const { error, games } = data;

  const platforms = games ? Array.from(new Set(games.flatMap((game) => game.platform.split(', ')))) : [];

  const filteredGames =
    games &&
    games.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre ? game.genre.includes(selectedGenre) : true;
      const matchesRating = selectedRating ? game.rating >= parseFloat(selectedRating) : true;
      const matchesPrice = game.price <= selectedPrice;
      const matchesPlatform = selectedPlatform ? game.platform.includes(selectedPlatform) : true;
      return matchesSearch && matchesGenre && matchesRating && matchesPrice && matchesPlatform;
    });

  const truncateDescription = (desc) => {
    const words = desc.split(" ");
    if (words.length > 30) {
      return words.slice(0, 30).join(" ") + "...";
    }
    return desc;
  };

  return (
    <div className="bg-[#10061f] text-white min-h-screen p-4">
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-purple-800 bg-gray-100 text-black"
        />
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="w-full sm:w-1/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-purple-800 bg-gray-100 text-black"
        >
          <option value="">All Genres</option>
          {games &&
            Array.from(new Set(games.flatMap((game) => game.genre))).map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
        </select>
        <select
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
          className="w-full sm:w-1/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-100 text-black"
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
          className="w-full sm:w-1/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 bg-gray-100 text-black"
        >
          <option value="">All Platforms</option>
          {platforms &&
            platforms.map((platform, index) => (
              <option key={index} value={platform}>
                {platform}
              </option>
            ))}
        </select>
      </div>
      <div className="mb-4 w-full sm:w-1/4">
        <label className="block mb-2 text-white text-xl">Max Price: ${selectedPrice}</label>
        <input
          type="range"
          min="0"
          max="300"
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
          className="w-full h-4 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {error && <div className="text-red-500">Error: {error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {filteredGames &&
          filteredGames.map((game) => (
            <div
              key={game._id}
              className="bg-[#1e0b37] rounded p-4 relative transform transition-transform hover:scale-105"
            >
              <img src={game.url} alt={game.title} className="h-[25vh] w-full object-cover rounded" />
              <div className="p-4">
                <p className="text-lg text-[#d3bbe6]">{game.genre.join(', ')}</p>
                <h5 className="text-3xl text-amber-400">{game.title}</h5>
                <p className="text-sm text-gray-400">{truncateDescription(game.desc)}</p>
                <p className="mt-3 text-xl text-amber-400">${game.price}</p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex space-x-2 mt-3">
                    <button className="bg-purple-800 text-white px-4 py-2 rounded">DETAILS</button>
                    <button className="bg-purple-800 text-white px-4 py-2 rounded">BUY NOW</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllGame;
