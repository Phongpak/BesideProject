import axios from 'axios';
import { getAccessToken, removeAccessToken } from '../utilities/localStorage';
import { API_ENDPOINT_URL } from './env';

axios.defaults.baseURL = API_ENDPOINT_URL;

axios.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

axios.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response.status === '401') {
      removeAccessToken();
      window.location.assign('/');
    }
    return Promise.reject(err);
  }
);

export default axios;