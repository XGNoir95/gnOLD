import React from 'react';
import { Link } from 'react-router-dom';
import BannerCard from './BannerCard';

const Hero = () => {
  return (
    <div className="md:h-[60vh] flex flex-col md:flex-row items-center justify-center px-4 md:px-0">
      {/* Left section for text content */}
      <div className="w-full mb-8 md:mb-0 md:w-3/6 flex flex-col items-center md:items-start justify-center text-center md:text-left">
        <div className="flex items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-amber-500 leading-tight">
            Discover Your Next Great Game
          </h1>
        </div>
        <p className="mt-4 text-base md:text-lg lg:text-2xl text-zinc-300">
          Game-Nova is a platform for gamers to find and download their favorite games.
        </p>
        <div className="mt-6 md:mt-8">
          <Link
            to="/all-games"
            className="text-amber-500 text-base md:text-lg lg:text-xl font-semibold border border-amber-500 px-6 md:px-8 lg:px-10 py-2 hover:bg-pink-500 hover:text-white hover:border-pink-500 rounded-full inline-block"
          >
            Browse Games
          </Link>
        </div>
      </div>

      {/* Right section for banner slider */}
      <div className="w-full md:w-3/6 flex items-center justify-center">
        <BannerCard />
      </div>
    </div>
  );
};

export default Hero;
