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
// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/users';

// export const registerUser = async (userData) => {
//   try {
//     console.log('Registering user:', userData);
//     const response = await axios.post(`${API_URL}/register`, userData);
//     console.log('Registration response:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Registration error:', error.response ? error.response.data : error.message);
//     throw error;
//   }
// };

// export const loginUser = async (userData) => {
//   try {
//     console.log('Logging in user:', userData);
//     const response = await axios.post(`${API_URL}/login`, userData);
//     console.log('Login response:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Login error:', error.response ? error.response.data : error.message);
//     throw error;
//   }
// };

// export const getData = async () => {
//   try {
//     console.log('Fetching data from:', `${API_URL}`);
//     const response = await axios.get(`${API_URL}`);
//     console.log('Data fetched:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching data:', error.response ? error.response.data : error.message);
//     throw error;
//   }
// };
