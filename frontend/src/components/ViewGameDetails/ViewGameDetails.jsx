import React, { useState, useEffect } from 'react';
import Axios from "axios";
import Loader from '../Loader/loader';
import { useParams } from 'react-router-dom';

// Modal Component
const Modal = ({ isOpen, onClose, imgSrc }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative max-w-4xl max-h-full">
                <img src={imgSrc} alt="Full-size" className="object-contain w-full h-full" />
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-white bg-gray-800 p-2 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

const ViewGameDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const headers = {
                authorization: `Bearer ${token}`,
            };
            
            try {
                const response = await Axios.get(`https://gn-old-api.vercel.app/api/v1/get-game-by-id/${id}`, {
                    headers,
                    withCredentials: true,
                });
                console.log(response);
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching game data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div className="px-12 py-8 bg-zinc-900 text-red-500">Error fetching game data.</div>;
    }

    if (!data) {
        return <div className="px-12 py-8 bg-zinc-900 text-white">No game data found.</div>;
    }

return (
        <div 
            className="min-h-screen bg-cover bg-center text-white px-10 py-8" 
            style={{ backgroundImage: `url('/bg2.jpg')` }}
        >
            <div className='px-12 py-8 flex gap-8'>
                {/* Image Container */}
                <div 
            className="min-h-screen bg-cover bg-center text-white px-10 py-8" 
            style={{ backgroundImage: `url('/bg.jpg')` }}
        >
                    <div className='relative w-full max-w-[800px] max-h-[500px]  mt-36'>
                        <img 
                            src={data.url} 
                            alt="Game" 
                            className='object-cover w-full h-full rounded cursor-pointer' 
                            onClick={openModal}
                        />
                    </div>
                </div>
                {/* Details Section */}
                <div className='p-4 w-3/6'>
                    <h1 className="text-5xl text-amber-500 font-bold">
                        {data.title}
                    </h1>
                    <p className='text-2xl text-zinc-300 mt-3'>by - {data.author}</p>
                    <p className='text-amber-500 mt-14 text-3xl font-semibold'>Description:</p>
                    <p className='text-zinc-300 mt-4 text-2xl '>{data.desc}</p>
                    <p className='text-amber-500 mt-4 text-2xl font-semibold'>Genre: <span className='text-zinc-300'>{data.genre}</span></p>
                    <p className='text-amber-500 mt-4 text-2xl font-semibold'>Platform: <span className='text-zinc-300'>{data.platform}</span></p>
                    <p className='text-amber-500 mt-4 text-2xl font-semibold'>Rating: <span className='text-zinc-300'>{data.rating}</span></p>
                    <p className='text-amber-500 mt-8 text-2xl font-bold'>Price: <span className='text-zinc-300'>${data.price}</span></p>
                    
                    <div className='mt-8 gap-4'>
                    <button className="bg-purple-800 rounded hover:bg-pink-500 hover:text-white px-6 py-3 w-full md:w-auto text-xl">ADD TO CART</button>
                    </div>
                </div>
            </div>

            {/* Modal for Full-Size Image */}
            <Modal isOpen={isModalOpen} onClose={closeModal} imgSrc={data.url} />
        </div>
    );
};

export default ViewGameDetails;
