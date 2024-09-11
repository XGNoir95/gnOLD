import React from "react";
import Hero from "../components/Home/Hero";
import Trending from "../components/Home/Trending";
import RecentlyAdd from "../components/Home/RecentlyAdd";

const Home = () => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center text-white px-10 py-8" 
      style={{ backgroundImage: `url('bg.jpg')` }}
    >
      <Hero />
      <Trending />
      <RecentlyAdd />
    </div>
  );
};

export default Home;
