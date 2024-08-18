import axios from 'axios';
import { getSession } from 'next-auth/react';
import { cookies } from 'next/headers';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: 'https://was.dkation.com',
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (config.url !== '/refresh' && config.url !== '/login') {
      if (session) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// api.interceptors.response.use(
//   async (response) => {
//     return response;
//   },
//   async (error) => {
//     const req = error.config;
//     if (error.response.status === 403) {
//       try {
//         const res = await api.get('/api/auth/refresh');
//         const { accessToken } = res.data.data;
//         req.headers.Authorization = `Bearer ${accessToken}`;
//       } catch (err) {
//         const navigate = useNavigate();
//         navigate('/login');
//         return Promise.reject(err);
//       }
//     }
//     return Promise.reject(error);
//   },
// );

export default api;
