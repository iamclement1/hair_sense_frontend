import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 36000,
});

// Add a request interceptor
client.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    let token = JSON.parse(sessionStorage.getItem('access_token'));
    if (token) {
      config.headers.common['Authorization'] = `Bearer ${token}`;
      config.headers['Content-Type'] = 'application/json';
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
  (error) => {
    if (error.response && error.response.status === 401) {
      // delete token from session storage
    }

    if (error.response.status === 500) {
      error.response.data.message = 'Something went wrong, Please try again!';
    }
    return Promise.reject(error);
  }
);

export default client;