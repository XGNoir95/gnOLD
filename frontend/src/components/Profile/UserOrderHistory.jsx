import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState([]);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await Axios.get(
          'http://localhost:1000/api/v1/get-order-history',
          { headers }
        );
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };
    fetchOrderHistory();
  }, []);

  return (
    <div className="bg-[#1e0b37] px-4 md:px-8 lg:px-12 py-8">
      {OrderHistory.length === 0 ? (
        <div className="p-4 text-zinc-100 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-amber-500 mb-8">
            No Order History
          </h1>
        </div>
      ) : (
        <div className="p-0 md:p-4 text-zinc-100">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-amber-500 mb-8">
            Your Order History
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
            <div className="flex-[1] md:w-[5%] text-left">
              <h1>Mode</h1>
            </div>
          </div>

          {OrderHistory.map((items, i) => (
            <div
              className="mb-2 w-full text-base md:text-lg rounded py-2 px-2 md:px-4 flex flex-col md:flex-row gap-2 hover:bg-purple-900 hover:cursor-pointer"
              key={i}
            >
              <div className="flex-[1] md:w-[5%] text-left">
                <h1>{i + 1}</h1>
              </div>
              <div className="flex-[2] md:w-[25%] text-left">
                {items.game ? (
                  <Link
                    to={`/view-game-details/${items.game._id}`}
                    className="hover:text-amber-500 font-semibold"
                  >
                    {items.game.title}
                  </Link>
                ) : (
                  <span>Game information not available</span>
                )}
              </div>
              <div className="flex-[4] md:w-[45%] text-left">
                <h1>
                  {items.game
                    ? `${items.game.desc.slice(0, 50)}...`
                    : 'Description not available'}
                </h1>
              </div>
              <div className="flex-[1] md:w-[10%] text-left">
                <h1>{items.game ? `$${items.game.price}` : 'N/A'}</h1>
              </div>
              <div className="flex-[1] md:w-[10%] text-left">
                <h1 className="font-semibold">
                  {items.status === 'Order placed' ? (
                    <div className="text-yellow-500">{items.status}</div>
                  ) : items.status === 'Canceled' ? (
                    <div className="text-red-500">{items.status}</div>
                  ) : items.status === 'Out for delivery' ? (
                    <div className="text-amber-500">{items.status}</div>
                  ) : (
                    <div className="text-green-500">{items.status}</div>
                  )}
                </h1>
              </div>
              <div className="flex-[1] md:w-[5%] text-left">
                <h1 className="text-lg font-semibold text-zinc-400">
                  Cash On Delivery
                </h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrderHistory;
