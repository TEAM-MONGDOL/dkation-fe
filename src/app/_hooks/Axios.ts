import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    if (config.url !== '/refresh' && config.url !== '/login') {
      const accessToken = sessionStorage.getItem('accessToken');
      if (accessToken) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const req = error.config;
    if (error.response.status === 500 || error.response.status === 401) {
      try {
        const refresh = sessionStorage.getItem('refreshToken');
        const email = sessionStorage.getItem('email');
        const res = await api.post('/user/refresh', {
          refreshToken: refresh,
          email,
        });
        const { accessToken } = res.data.data;
        sessionStorage.setItem('accessToken', accessToken);
        req.headers.Authorization = `Bearer ${accessToken}`;
      } catch (err) {
        const navigate = useNavigate();
        navigate('/login');
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
