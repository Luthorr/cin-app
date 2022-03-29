/* eslint-disable no-param-reassign */
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://185.41.68.195:5000/',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
