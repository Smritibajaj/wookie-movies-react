import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


// Add a request interceptor to set headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Set headers here
    config.headers['Authorization'] = `Bearer ${import.meta.env.VITE_API_TOKEN}`;
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  }
);
export default axiosInstance;
