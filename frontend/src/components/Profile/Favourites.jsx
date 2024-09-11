import React,{ useState } from 'react'
import { useEffect } from 'react';
import Axios from "axios";
import GameCard from '../GameCard/GameCard';
const Favourites = () => {
  const [FavouriteGames, setFavouriteGames] = useState();
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() =>{
    const fetch = async () => {
      const response = await Axios.get("http://localhost:1000/api/v1/get-favourite-games",{ headers });
      setFavouriteGames(response.data.data);
    };
    fetch();
  },[FavouriteGames]);
  return (
    <>      
      {FavouriteGames && FavouriteGames.length === 0 && (
        <div className='text-4xl font-semibold h-[60vh] text-amber-500 flex items-center justify-center bg-[#1e0b37]'>
          No Favourite Games
        </div>
      )}
      <div className="grid grid-cols-4 gap-4">
        {FavouriteGames &&
          FavouriteGames.map((items, i) => (
            <div key={i}>
              <GameCard data={items} favourite={true} />
            </div>
          ))}
      </div>
    </>
  );
}

export default Favourites;