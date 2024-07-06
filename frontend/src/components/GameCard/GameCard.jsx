import React from 'react';
import { Link } from 'react-router-dom';

const GameCard = ({ data }) => {
  return (
    <div className="bg-[#1e0b37] rounded p-4 relative max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <img src={data.url} alt={data.title} className="h-[25vh] w-full object-cover rounded"/>
      <div className="p-4">
        <p className="text-lg text-[#d3bbe6]">{data.genre}</p>
        <h5 className="text-3xl text-amber-400">{data.title}</h5>
        <p className="text-sm text-gray-400">{data.description}</p>
        <p className="mt-2 text-xl text-amber-400">{data.price}</p>
        <div className="flex justify-between md:justify-start items-center mt-2">
          <div className="flex flex-wrap gap-2 md:gap-5 justify-center md:justify-start mt-3 w-full md:w-auto">
            <button className="bg-purple-800 text-white px-4 py-2 rounded w-full md:w-auto">DETAILS</button>
            <button className="bg-purple-800 text-white px-4 py-2 rounded w-full md:w-auto">BUY NOW</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
