// utils/axiosConfig.ts
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Your Django backend URL
    withCredentials: true, // This ensures cookies are sent with requests
});

// Function to get access token from localStorage
const getAccessToken = () => {
    return localStorage.getItem('access_token');
};

// Add JWT token to request headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
