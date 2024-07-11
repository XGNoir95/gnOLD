import React from 'react';

const TrendingCard = ({ data }) => {
  return (
    <div className="bg-[#1e0b37] rounded p-4 relative flex flex-col md:flex-row">
      <img src={data.url} alt={data.title} className="h-48 md:h-80 w-full md:w-1/3 object-cover rounded" />
      <div className="p-4 flex-1">
        <p className="text-lg text-[#d3bbe6]">{data.genre}</p>
        <h5 className="text-3xl md:text-5xl text-amber-400">{data.title}</h5>
        <p className="text-sm md:text-lg text-gray-400 mt-2 md:mt-4">{data.description}</p>
        <p className="mt-4 md:mt-6 text-xl md:text-2xl text-amber-400 font-semibold">{data.price}</p>
        <div className="flex justify-between md:justify-start items-center mt-2">
          <div className="flex flex-wrap gap-2 md:gap-5 justify-center md:justify-start mt-3 md:mt-5 w-full md:w-auto">
            <button className="bg-purple-800 rounded hover:bg-pink-500 px-4 py-2 rounded w-full md:w-auto">DETAILS</button>
            <button className="bg-purple-800 rounded hover:bg-pink-500 px-4 py-2 rounded w-full md:w-auto">BUY NOW</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
