import React from 'react';
import { Link } from 'react-router-dom';
import Axios from "axios";

const GameCard = ({ data, favourite, refreshFavourites }) => {
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    gameid: data._id,
  };

  const handleRemoveGame = async () => {
    try {
      const response = await Axios.put(
        "http://localhost:1000/api/v1/remove-game-from-favourite",
        {}, { headers }
      );
      alert(response.data.message);
      //window.location.reload();  // Reload the page after alert
    } catch (error) {
      console.error("Error removing game from favourites:", error);
    }
  };

  return (
    <div className="bg-[#1e0b37] rounded p-4 relative max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl transform transition-transform hover:scale-105 h-full flex flex-col">
      <Link to={`/view-game-details/${data._id}`} className="flex-grow">
        <img src={data.url} alt={data.title} className="h-[25vh] w-full object-cover rounded" />
        <div className="p-4 flex flex-col flex-grow">
          <p className="text-lg text-[#d3bbe6]">{data.genre}</p>
          <h5 className="text-3xl text-amber-400">{data.title}</h5>
          <p className="text-sm text-gray-400 flex-grow overflow-hidden line-clamp-3">{data.desc}</p>
          <p className="mt-2 text-xl text-amber-400">${data.price}</p>
        </div>
      </Link>
      <div className="mt-2 flex justify-center items-center h-20">
        {favourite ? (
          <button
            className="bg-purple-800 rounded hover:bg-pink-500 hover:text-white px-4 py-2"
            onClick={handleRemoveGame}
          >
            Remove From Favourites
          </button>
        ) : (
          <div className="flex gap-2">
            {/* <button className="bg-purple-800 rounded hover:bg-pink-500 hover:text-white px-4 py-2">DETAILS</button> */}
            <Link
              to={`/view-game-details/${data._id}`}
              className="bg-purple-800 rounded hover:bg-pink-500 hover:text-white px-4 py-2 text-center"
            >
              BUY NOW
            </Link>          </div>
        )}
      </div>
    </div>
  );
};

export default GameCard;
