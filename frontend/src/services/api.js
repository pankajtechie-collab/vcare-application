import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8083/api', // Update with your backend port if needed
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;