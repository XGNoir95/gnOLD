import React, { useEffect, useState } from 'react';
import axios from "axios";
import GameCard from '../GameCard/GameCard';

const RecentlyAdd = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("https://game-nova-api.vercel.app/api/v1/get-recent-games", {
          withCredentials: true
        });
        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="mt-4 px-4">
      <div className="flex items-center font-bold">
        <h4 className="text-4xl text-amber-400">Recently Added</h4>
        <h4 className="text-4xl text-white ml-2">Games :</h4>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Data.map((item, i) => (
          <div key={i}>
            <GameCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyAdd;
