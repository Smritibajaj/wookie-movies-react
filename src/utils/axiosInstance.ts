import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

export default axiosInstance;