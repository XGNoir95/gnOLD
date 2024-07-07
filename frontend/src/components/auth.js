// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/users';

// // Register a new user
// export const registerUser = async (userData) => {
//   try {
//     const response = await axios.post(`${API_URL}/register`, userData);
//     return response.data; // Assuming the backend returns { message: 'User registered successfully' } upon success
//   } catch (error) {
//     throw error; // Propagate the error to handle it in the component
//   }
// };

// // Login an existing user
// export const loginUser = async (userData) => {
//   try {
//     const response = await axios.post(`${API_URL}/login`, userData);
//     return response.data; // Assuming the backend returns { token: 'JWT_TOKEN_HERE' } upon successful login
//   } catch (error) {
//     throw error; // Propagate the error to handle it in the component
//   }
// };

// // Example function to fetch user details after login (requires authentication)
// export const fetchUserDetails = async () => {
//   try {
//     const token = localStorage.getItem('token'); // Assuming you store JWT token in localStorage after login
//     if (!token) {
//       throw new Error('No token found');
//     }

//     // Example of authenticated request using JWT token in Authorization header
//     const response = await axios.get(`${API_URL}/user`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response.data; // Assuming backend returns user details upon successful authentication
//   } catch (error) {
//     throw error; // Propagate the error to handle it in the component
//   }
// };
