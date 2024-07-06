import React from "react";
import Hero from "../components/Home/Hero";
import Trending from "../components/Home/Trending";
import RecentlyAdd from "../components/Home/RecentlyAdd"; // Adjust the import path based on your project structure

const Home = () => {
  return (
    <div className="bg-[#10061f] text-white px-10 py-8"> {/* Updated background color */}
      <Hero />
      <Trending />
      <RecentlyAdd />
    </div>
  );
};

export default Home;
