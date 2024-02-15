import axios from 'axios';

import { getStorageAuthItems, refreshToken } from '@/config/apis';

const client = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  timeout: 36000,
});

// Add a request interceptor
client.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const { token } = getStorageAuthItems();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    let originalConfig = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalConfig._retry
    ) {
      originalConfig._retry = true;

      try {
        const {
          token,
          refresh,
          profile: { userName },
        } = getStorageAuthItems();

        const rs = await refreshToken({
          token,
          refreshToken: refresh,
          userName,
        });

        const { jwtToken, refreshToken: resToken } = rs.data.data;

        sessionStorage.setItem('token', jwtToken);
        sessionStorage.setItem('refresh', resToken);

        client.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

        return client(originalConfig);
      } catch (_error) {
        if (_error.response && _error.response.data) {
          return Promise.reject(_error.response.data);
        }

        return Promise.reject(_error);
      }
    }

    if (error.response.status === 500) {
      error.response.data.message = 'Something went wrong, Please try again!';
    }
    return Promise.reject(error);
  }
);

export default client;