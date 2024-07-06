import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUP from "./pages/SignUP";
import AllGame from "./pages/AllGame";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
const App = () =>{
  return (
    <div>
      <Router>
         <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/all-games" element={<AllGame />} />
          <Route path="/SingUp" element={<SignUP />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer/>
      </Router>
   </div>
  );
};

export default App;