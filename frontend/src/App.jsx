import React,{useEffect} from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";
import AllGame from "./pages/AllGame";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUP";
import { useDispatch,useSelector } from "react-redux";
import { authActions } from "./Store/auth";
import ViewGameDetails from "./components/ViewGameDetails/ViewGameDetails";

const App = () => {
  const dispatch =useDispatch();
  const role = useSelector((state)=> state.auth.role);
  useEffect(()=>{
    if(
      localStorage.getItem("id")&&
      localStorage.getItem("token")&&
      localStorage.getItem("role")
    ){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  },[]);
  return (
    <div>
      
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/all-games" element={<AllGame />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="view-game-details/:id" element={<ViewGameDetails/>} />
        </Routes>
        <Footer />
    
    </div>
  );
};

export default App;
