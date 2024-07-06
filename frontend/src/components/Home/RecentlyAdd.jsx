import React, { useEffect, useState } from 'react';
import GameCard from '../GameCard/GameCard';

const RecentlyAdd = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    // Mock data to simulate fetched data
    const mockData = [
      {
        id: 1,
        url: 'https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/hero/mw-wz/WZ-Season-Three-Announce-TOUT.jpg',
        title: 'Call of Duty Warzone',
        genre: 'Single-player, Action, Adventure',
        description: 'Pre-order to instantly unlock the Quicksilver Storm Exotic weapon, a new Exotic Ghost ...',
        Price: 100,
      },
      {
        id: 2,
        url: 'https://cdn1.epicgames.com/salesEvent/salesEvent/amogusportrait_1200x1600-66ad0e4d363e1c92f9f8aae67a96dd31',
        title: 'Among Us',
        genre: 'Single-player, Action, Adventure',
        description: 'Pre-order to instantly unlock the Quicksilver Storm Exotic weapon, a new Exotic Ghost ...',
        Price: 100,
      },
      {
        id: 3,
        url: 'https://4kwallpapers.com/images/wallpapers/marvels-spider-man-3840x2160-11609.jpeg',
        title: 'Marvels Spider Man 2',
        genre: 'Single-player, Action, Adventure',
        description: 'Pre-order to instantly unlock the Quicksilver Storm Exotic weapon, a new Exotic Ghost ...',
        Price: 100,
      },
      {
        id: 4,
        url: 'https://wallpaper.dog/large/3588.jpg',
        title: 'Witcher 3',
        genre: 'Single-player, Action, Adventure',
        description: 'Pre-order to instantly unlock the Quicksilver Storm Exotic weapon, a new Exotic Ghost ...',
        Price: 100,
      },
    ];
    setData(mockData);
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
