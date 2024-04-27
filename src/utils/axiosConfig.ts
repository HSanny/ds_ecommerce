// src/api/axiosConfig.ts
import axios from 'axios';

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000/',  // Adjust this as necessary
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
