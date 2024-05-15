import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Your Django backend URL
    withCredentials: true, // This ensures cookies are sent with requests
});

// Function to get CSRF token from cookie
const getCSRFToken = () => {
    const name = 'csrftoken';
    const cookies = document.cookie.split(';');
    console.log('document.cookie ', document)
    for (let cookie of cookies) {
        while (cookie.charAt(0) === ' ') cookie = cookie.substring(1);
        if (cookie.indexOf(name + '=') === 0) return cookie.substring(name.length + 1);
    }
    return '';
};

// Function to set CSRF token
const setCSRFToken = async () => {
    try {
        await axiosInstance.get('/auth/csrf-token/');
        console.log('CSRF Token set.');
    } catch (error) {
        console.error('Error setting CSRF token:', error);
    }
};

// Set CSRF token on initial load
setCSRFToken();

// Add CSRF token to request headers
axiosInstance.interceptors.request.use(
    (config) => {
        const csrfToken = getCSRFToken();
        console.log('CSRF Token: ', csrfToken)
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;

