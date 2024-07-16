import React from "react";
import Hero from "../components/Home/Hero";
import Trending from "../components/Home/Trending";
import RecentlyAdd from "../components/Home/RecentlyAdd"; // Adjust the import path based on your project structure

const Home = () => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center text-white px-10 py-8" 
      style={{ backgroundImage: `url('bg2.jpg')` }}
    >
      <Hero />
      <Trending />
      <RecentlyAdd />
    </div>
  );
};

export default Home;
