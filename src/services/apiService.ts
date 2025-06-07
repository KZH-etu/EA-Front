import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // base de toutes tes routes API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;