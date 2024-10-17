// // MyTours.js

// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { BASE_URL } from '../utils/config'

// const MyTours = () => {
//     const { user } = useContext(AuthContext);
//     const { id } = useParams();
//     const [userTours, setUserTours] = useState([]);

//     useEffect(() => {
//         // Fetch user's tours based on userId
//         fetchUserTours(id);
//     }, [id]); // Re-fetch when userId changes

//     const fetchUserTours = async (id) => {
//     try {
//         const response = await fetch(`${BASE_URL}/userbooking/${id}`);
//         if (!response.ok) {
//             throw new Error('Failed to fetch user tours');
//         }
//         const responseData = await response.json(); // Parse JSON data
//         if (responseData.success) {
//             setUserTours(responseData.data);
//         } else {
//             throw new Error(responseData.message || 'Failed to fetch user tours');
//         }
//     } catch (error) {
//         console.error('Error fetching user tours:', error);
//     }
// };


//     return (
//         <div>
//             <h1>My Tours</h1>
//             {userTours.length > 0 ? (
//                 <ul>
//                     {userTours.map((tour, index) => (
//                         <li key={index}>{tour.tourName}</li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No tours booked yet.</p>
//             )}
//         </div>
//     );
// };

// export default MyTours;

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';
import './MyTours.css'; // Import CSS file for styling


const MyTours = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [userTours, setUserTours] = useState([]);

    useEffect(() => {
        // Fetch user's tours based on userId
        fetchUserTours(id);
            
    }, [id]); // Re-fetch when userId changes

    const fetchUserTours = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/userbooking/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user tours');
            }
            const responseData = await response.json(); // Parse JSON data
            if (responseData.success) {
                setUserTours(responseData.data);
                

            } else {
                throw new Error(responseData.message || 'Failed to fetch user tours');
            }
        } catch (error) {
            console.error('Error fetching user tours:', error);
        }
    };

    return (
        <div className="my-tours-container">
            <h1>My Booking</h1>
            <div className="tour-cards-container">
                {userTours.length > 0 ? (
                    userTours.map((tour, index) => (
                        <div className="tour-card" key={index}>
                            <img src={tour.photo} alt={tour.tourName} />
                            <div className="tour-details">
                                <h2>{tour.tourName}</h2>
                                <p>{tour.city}</p>
                                <p>{tour.address}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No tours booked yet.</p>
                )}
            </div>
        </div>
    );
};

export default MyTours;
