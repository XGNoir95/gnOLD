import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Loader from '../components/Loader/loader';
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await Axios.get('https://gn-old.vercel.app/api/v1/get-user-cart', { headers });
        setCart(response.data.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, []);

  const deleteItem = async (gameId) => {
    try {
      const response = await Axios.put(`https://gn-old.vercel.app/api/v1/remove-game-from-cart/${gameId}`, {}, { headers });
      setCart(Cart.filter((item) => item._id !== gameId));
      alert(response.data.message);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  useEffect(() => {
    if (Cart.length > 0) {
      const total = Cart.reduce((acc, item) => acc + item.price, 0);
      setTotal(total);
    }
  }, [Cart]);

  const placeOrder = async () => {
    try {
      const response = await Axios.post('https://gn-old.vercel.app/api/v1/place-order', { order: Cart }, { headers });
      alert(response.data.message);
      navigate('/profile/orderHistory');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="bg-[url('/bg5.jpg')] px-4 md:px-12 py-8 min-h-screen">
      {!Cart.length && (
        <div className="w-full h-full flex items-center justify-center">
          {/* <Loader /> */}
        </div>
      )}

      {Cart.length === 0 && (
        <div className="h-screen">
          <div className="h-[80%] flex items-center justify-center flex-col">
            <h1 className="bg-[url('/bg.jpg')] text-5xl lg:text-6xl font-semibold text-amber-500 px-5 py-5">Empty Cart</h1>
          </div>
        </div>
      )}

      {Cart.length > 0 && (
        <>
          <h1 className="text-6xl font-bold text-amber-500 mb-8">Your Cart</h1>
          <div className="space-y-6">
            {Cart.map((item, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row items-center justify-between bg-[#1e0b37] p-6 rounded-lg"
              >
                {/* Game Image */}
                <div className="w-full md:w-[25%] flex-shrink-0 mb-4 md:mb-0">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="object-cover w-full h-[20vh] md:h-[15vh] rounded-md"
                  />
                </div>

                {/* Game Details */}
                <div className="w-full md:w-[40%] text-left md:ml-4">
                  <h1 className="text-xl md:text-2xl font-semibold text-amber-500">{item.title}</h1>
                  <p className="text-zinc-400 mt-2 hidden md:block">{item.desc.slice(0, 120)}...</p>
                  <p className="text-zinc-400 mt-2 block md:hidden">{item.desc.slice(0, 80)}...</p>
                </div>

                {/* Price & Actions */}
                <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-[25%]">
                  <h2 className="text-2xl font-semibold text-zinc-100 mb-4 md:mb-0">${item.price} USD</h2>
                  <button
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-amber-500 transition"
                    onClick={() => deleteItem(item._id)}
                  >
                    <AiFillDelete size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total Amount Section */}
          <div className="mt-8 flex items-center justify-end">
            <div className="p-6 bg-[#1e0b37] rounded-lg w-full md:w-[40%]">
              <h1 className="text-3xl text-amber-500 font-semibold mb-4">Total Amount</h1>
              <div className="flex items-center justify-between text-2xl text-zinc-200 mb-4">
                <h2>{Cart.length} Items</h2>
                <h2>${Total.toFixed(2)}</h2>
              </div>
              <button
                className="w-full bg-purple-900 text-white py-3 rounded-lg font-semibold text-xl hover:bg-amber-500 hover:text-zinc-900 transition"
                onClick={placeOrder}
              >
                Place Your Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
