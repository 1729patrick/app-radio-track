import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.com.br',
});

export default api;
