import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
    // baseURL: 'https://whathecode-learnstream.onrender.com',
    baseURL:  import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', // Change this to your backend URL
    withCredentials: true, // Allows sending cookies
});
export default apiClient;

// Function to call the backend refresh token endpoint
// const fetchNewAccessToken = async () => {
//     try {
//         const response = await apiClient.post('/auth/refresh-token', {}, { withCredentials: true });
//         const { accessToken } = response.data.data;

//         // Store the new access token in localStorage
//         localStorage.setItem('studentAccessToken', accessToken);

//         return accessToken; // Return the new token for immediate use if needed
//     } catch (error) {
//         console.error('Error refreshing access token:', error.response?.data?.message || error.message);
//         throw error; // Handle logout or other fallback logic if needed
//     }
// };

// Add interceptors here using fetchNewAccessToken

