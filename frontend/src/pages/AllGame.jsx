import React, { useState, useEffect } from "react";
import Axios from "axios";
import GameCard from "../components/GameCard/GameCard";
import SearchOptions from "../components/SearchOptions";

const AllGame = () => {
  const [data, setData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(300); // Set the max price according to your data
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const getData = async () => {
    try {
      const response = await Axios.get("https://gn-old-api.vercel.app/api/v1/sort-games", {
        withCredentials: true
      });
      console.log(response.data.games); // Log the response to the console
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

  return (
    <div 
      className="min-h-screen bg-cover bg-center text-white px-10 py-8" 
      style={{ backgroundImage: `url('bg2.jpg')` }}
    >
      <SearchOptions
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
        genres={games ? Array.from(new Set(games.flatMap((game) => game.genre))) : []}
        platforms={platforms}
      />

      {error && <div className="text-red-500">Error: {error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {filteredGames &&
          filteredGames.map((game) => (
            <GameCard key={game._id} data={game} />
          ))}
      </div>
    </div>
  );
};

export default AllGame;
