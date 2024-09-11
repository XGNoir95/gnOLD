import React, { useState, useEffect } from 'react';
import Axios from "axios";
import Loader from '../Loader/loader';
import { useSelector } from 'react-redux'; 
import { useNavigate, useParams } from 'react-router-dom';
import { FaEdit, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { MdOutlineDelete } from "react-icons/md";

const EditGameModal = ({ isOpen, onClose, gameData, onUpdate }) => {
    const [formData, setFormData] = useState({
        url: gameData.url,
        title: gameData.title,
        author: gameData.author,
        price: gameData.price,
        desc: gameData.desc,
        platform: gameData.platform,
        rating: gameData.rating,
        genre: gameData.genre,
        year: gameData.year,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const headers = {
            authorization: `Bearer ${token}`,
            gameid: gameData._id,
        };

        try {
            const response = await Axios.put("http://localhost:1000/api/v1/update-game", formData, { headers });
            alert(response.data.message);
            window.location.reload(); 
            onUpdate(); 
            onClose();
        } catch (error) {
            console.error('Error updating game:', error);
            alert('Error updating game. Please ensure you have the necessary permissions.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-[url('/bg.jpg')] text-white p-8 rounded-md shadow-lg w-11/12 max-w-xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-4xl font-bold mb-4 text-amber-500 text-center">Edit Game Details</h2>
                <form onSubmit={handleSubmit}>
                    {/* Form Fields */}
                    <div className="mb-4">
                        <label className="block mb-2 text-amber-500 text-xl font-semibold">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-2 border rounded bg-gray-200 text-black font-semibold text-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-amber-500 text-xl font-semibold">Author</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="w-full p-2 border rounded bg-gray-200 text-black font-semibold text-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-amber-500 text-xl font-semibold">Price</label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full p-2 border rounded bg-gray-200 text-black font-semibold text-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-amber-500 text-xl font-semibold">Description</label>
                        <textarea
                            name="desc"
                            value={formData.desc}
                            onChange={handleChange}
                            className="w-full p-2 border rounded bg-gray-200 text-black font-semibold text-lg"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-amber-500 text-xl font-semibold">Platform</label>
                        <input
                            type="text"
                            name="platform"
                            value={formData.platform}
                            onChange={handleChange}
                            className="w-full p-2 border rounded bg-gray-200 text-black font-semibold text-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-amber-500 text-xl font-semibold">Rating</label>
                        <input
                            type="text"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            className="w-full p-2 border rounded bg-gray-200 text-black font-semibold text-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-amber-500 text-xl font-semibold">Genre</label>
                        <input
                            type="text"
                            name="genre"
                            value={formData.genre}
                            onChange={handleChange}
                            className="w-full p-2 border rounded bg-gray-200 text-black font-semibold text-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-amber-500 text-xl font-semibold">Year</label>
                        <input
                            type="text"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="w-full p-2 border rounded bg-gray-200 text-black font-semibold text-lg mb-3"
                        />
                    </div>
                    {/* Submit and Cancel Buttons */}
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="bg-white text-black text-lg font-semibold px-4 py-2 rounded mr-2 hover:bg-red-600 hover:text-amber-500 hover:text-lg hover:font-semibold">Cancel</button>
                        <button type="submit" className="bg-purple-800 text-amber-500 text-lg font-semibold px-4 py-2 rounded hover:bg-amber-500 hover:text-white hover:text-lg hover:font-semibold">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const ViewGameDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            // if (!token) {
            //     setError('Not authorized');
            //     setLoading(false);
            //     return;
            // }
            
            const headers = {
                authorization: `Bearer ${token}`,
            };

            try {
                const response = await Axios.get(`http://localhost:1000/api/v1/get-game-by-id/${id}`, { headers });
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching game data:', error);
                setError('Error fetching game data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleFavourite = async () => {
        const headers = {
            id: localStorage.getItem('id'),
            authorization: `Bearer ${localStorage.getItem("token")}`,
            gameid: id,
        };
        try {
            const response = await Axios.put("http://localhost:1000/api/v1/add-game-to-favourite", {}, { headers });
            alert(response.data.message);
        } catch (error) {
            console.error('Error adding game to favourites:', error);
            alert('Failed to add game to favourites.');
        }
    };

    const handleCart = async () => {
        const headers = {
            id: localStorage.getItem('id'),
            authorization: `Bearer ${localStorage.getItem("token")}`,
            gameid: id,
        };
        try {
            const response = await Axios.put("http://localhost:1000/api/v1/add-to-cart", {}, { headers });
            alert(response.data.message);
        } catch (error) {
            console.error('Error adding game to cart:', error);
            alert('Failed to add game to cart.');
        }
    };

    const deleteGame = async () => {
        const headers = {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
            gameid: id,
        };
        try {
            const response = await Axios.delete("http://localhost:1000/api/v1/delete-game", { headers });
            alert(response.data.message);
            navigate("/all-games");
        } catch (error) {
            console.error("Error deleting game:", error);
            alert('Failed to delete game.');
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div className="px-12 py-8 bg-zinc-900 text-red-500">{error}</div>;
    }

    if (!data) {
        return <div className="px-12 py-8 bg-zinc-900 text-white">No game data found.</div>;
    }

    return (
        <div className="min-h-screen bg-cover bg-center text-white px-4 md:px-10 py-8" style={{ backgroundImage: `url('/bg2.jpg')` }}>
            <div className='flex flex-col lg:flex-row gap-8 px-4 md:px-12 py-8'>
                {/* Image Container */}
                <div className="flex-grow lg:w-1/2 min-h-[300px] lg:min-h-screen bg-cover bg-center text-white px-4 md:px-10 py-8" style={{ backgroundImage: `url('/bg.jpg')` }}>
                    <div className='flex justify-center items-center w-full max-w-[800px] max-h-[500px] mt-8 lg:mt-36 mx-auto'>
                        <img
                            src={data.url}
                            alt="Game"
                            className='object-cover w-full h-full rounded cursor-pointer'
                            onClick={openModal}
                        />
                    </div>
                </div>

                {/* Details Section */}
                <div className='flex-grow lg:w-1/2 p-4'>
                    <h1 className="text-3xl lg:text-5xl text-amber-500 font-bold">
                        {data.title}
                    </h1>
                    <p className='text-xl lg:text-2xl text-zinc-300 mt-3'>by - {data.author}</p>
                    <p className='text-amber-500 mt-8 lg:mt-14 text-2xl lg:text-3xl font-semibold'>Description:</p>
                    <p className='text-zinc-300 mt-4 text-xl lg:text-2xl text-justify'>{data.desc}</p>
                    <p className='text-amber-500 mt-4 text-xl lg:text-2xl font-semibold'>Genre: <span className='text-zinc-300'>{data.genre}</span></p>
                    <p className='text-amber-500 mt-4 text-xl lg:text-2xl font-semibold'>Platform: <span className='text-zinc-300'>{data.platform}</span></p>
                    <p className='text-amber-500 mt-4 text-xl lg:text-2xl font-semibold'>Rating: <span className='text-zinc-300'>{data.rating}</span></p>
                    <p className='text-amber-500 mt-8 text-xl lg:text-2xl font-bold'>Price: <span className='text-zinc-300'>${data.price}</span></p>
                    
                    {isLoggedIn === true && role === "user" &&
                        <div className='mt-8 flex justify-end gap-4'>
                            <button 
                                className="bg-pink-500 rounded-full hover:bg-purple-800 text-2xl p-6"
                                onClick = {handleFavourite}
                                ><FaHeart /></button>
                            <button 
                                className="bg-purple-800 rounded hover:bg-pink-500 hover:text-white font-semibold px-6 py-4 w-full md:w-auto text-xl lg:text-2xl"
                                onClick = {handleCart}
                                >ADD TO CART</button>
                        </div>}

                    {isLoggedIn === true && role === "admin" &&
                        <div className='mt-8 flex justify-end gap-4'>
                            <button className="bg-pink-500 rounded-full hover:bg-purple-800 text-2xl p-6" onClick={openEditModal}><FaEdit /></button>
                            <button className="bg-purple-800 rounded hover:bg-pink-500 hover:text-white font-semibold px-6 py-4 w-full md:w-auto text-xl lg:text-2xl flex items-center justify-center gap-2" onClick={deleteGame}>
                                <MdOutlineDelete />
                                Delete
                            </button>
                        </div>}
                </div>
            </div>

            {/* Modal for full-screen image view */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="relative">
                        <img
                            src={data.url}
                            alt="Game"
                            className='object-cover rounded cursor-pointer'
                            onClick={closeModal}
                        />
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            <EditGameModal isOpen={isEditModalOpen} onClose={closeEditModal} gameData={data} onUpdate={() => setData({ ...data })} />
        </div>
    );
};

export default ViewGameDetails;
