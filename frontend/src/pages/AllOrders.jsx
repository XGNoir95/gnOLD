import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/loader";
import { FaCheck, FaUserLarge } from "react-icons/fa6";
import { IoOpenOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import SeeUserData from "./SeeUserData";
const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState(-1);
  const [values, setValues] = useState({ status: "" });
  const [userdiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-all-orders",
          { headers }
        );
        setAllOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        if (error.response && error.response.status === 403) {
          alert("You do not have permission to access this resource.");
        } else {
          alert("An error occurred while fetching orders.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    try {
      const id = allOrders[i]._id;
      const response = await axios.put(
        `http://localhost:1000/api/v1/update-status/${id}`,
        values,
        { headers }
      );
      alert(response.data.message);
      setAllOrders((prevOrders) =>
        prevOrders.map((order, index) =>
          index === i ? { ...order, status: values.status } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("An error occurred while updating the order status.");
    }
  };

  if (loading) {
    return (
      <div className="h-[100%] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#1e0b37] px-4 md:px-8 lg:px-12 py-8 text-zinc-100">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-amber-500 mb-8">
          All Orders
        </h1>
        <div className="text-base md:text-lg font-semibold mt-4 mb-7 bg-purple-900 w-full rounded py-2 px-2 md:px-4 flex flex-col md:flex-row gap-2">
          <div className="flex-[1] md:w-[5%] text-left">
            <h1>Sr.</h1>
          </div>
          <div className="flex-[2] md:w-[25%] text-left">
            <h1>Games</h1>
          </div>
          <div className="flex-[4] md:w-[45%] text-left">
            <h1>Description</h1>
          </div>
          <div className="flex-[1] md:w-[10%] text-left">
            <h1>Price</h1>
          </div>
          <div className="flex-[1] md:w-[10%] text-left">
            <h1>Status</h1>
          </div>
          <div className="flex-[1] md:w-[5%] text-left text-center">
            <h1>User Info</h1>
          </div>
        </div>
        {allOrders.length > 0 ? (
          allOrders.map((items, i) => (
            <div
              className="mb-2 w-full text-base md:text-lg rounded py-2 px-2 md:px-4 flex flex-col md:flex-row gap-2 hover:bg-purple-900 hover:cursor-pointer"
              key={i}
            >
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>
              <div className="w-[22%]">
                {items.game ? (
                  <Link
                    to={`/view-game-details/${items.game._id}`}
                    className="hover:text-amber-500"
                  >
                    {items.game.title}
                  </Link>
                ) : (
                  <span>Game information not available</span>
                )}
              </div>
              <div className="w-0 md:w-[45%] hidden md:block">
                <h1>{items.game?.desc?.slice(0, 50) || "No Description"}</h1>
              </div>
              <div className="w-[17%] md:w-[9%]">
                <h1>${items.game?.price || "0.00"}</h1>
              </div>
              <div className="w-[30%] md:w-[16%]">
                <h1 className="font-semibold">
                  <button
                    className="hover:scale-105 transition-all duration-300"
                    onClick={() => setOptions(i)}
                  >
                    {items.status === "Order placed" ? (
                      <div className="text-pink-500">{items.status}</div>
                    ) : items.status === "Canceled" ? (
                      <div className="text-red-500">{items.status}</div>
                    ) : items.status === "Out for delivery" ? (
                      <div className="text-amber-500">{items.status}</div>
                    ) : (
                      <div className="text-green-500">{items.status}</div>
                    )}
                  </button>
                  <div className={`${options === i ? "block" : "hidden"} flex mt-4`}>
                    <select
                      name="status"
                      id=""
                      className="bg-gray-800"
                      onChange={change}
                      value={values.status}
                    >
                      {["Order placed", "Out for delivery", "Delivered", "Canceled"].map(
                        (status, index) => (
                          <option value={status} key={index}>
                            {status}
                          </option>
                        )
                      )}
                    </select>
                    <button
                      className="text-green-500 hover:text-pink-600 mx-2"
                      onClick={() => {
                        submitChanges(i);
                        setOptions(-1);
                      }}
                    >
                      <FaCheck />
                    </button>
                  </div>
                </h1>
              </div>
              <div className="w-[10%] md:w-[5%]">
                <button
                  className="text-xl hover:text-orange-500"
                  onClick={() => {
                    setuserDiv("fixed");
                    setuserDivData(items.user);
                  }}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="h-[100%] flex items-center justify-center text-2xl text-zinc-500">
            No orders found.
          </div>
        )}
      </div>
      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userdiv}
          setuserDiv={setuserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;
