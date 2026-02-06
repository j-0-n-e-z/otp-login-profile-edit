import axios from 'axios';

import { useToken } from '../store';

export const api = axios.create({
  baseURL: 'http://localhost:31299/api/',
  validateStatus: () => true
});

api.interceptors.request.use((config) => {
  const { token } = useToken.getState();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
