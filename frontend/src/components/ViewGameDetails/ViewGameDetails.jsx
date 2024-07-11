import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { useParams } from 'react-router-dom';

const ViewGameDetails = () => {
    const { id } = useParams();
    console.log(id);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await Axios.get(`https://gn-old-api.vercel.app/api/v1/get-game-by-id/${id}`, {
                    withCredentials: true
                });
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching game data:', error);
            }
        };

        fetch();
    }, [id]);

    return (
        <div>
            <h1>Game Details</h1>
            {/* Display game details here */}
            {data && (
                <div>
                    <h2>{data.title}</h2>
                    <p>{data.desc}</p>
                    {/* Display other details as needed */}
                </div>
            )}
        </div>
    );
}

export default ViewGameDetails;
