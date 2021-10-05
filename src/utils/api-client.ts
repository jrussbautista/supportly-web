import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

const token = window.localStorage.getItem('accessToken');

if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { status } = error.response;
    if (status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('currentUser');
      const pathname = location.pathname;
      if (pathname !== '/sign-in') {
        window.location.replace('/sign-in');
      }
    }
    return Promise.reject(error);
  }
);

export const setAuthHeaderToken = (token: string) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthHeaderToken = () => {
  instance.defaults.headers.common['Authorization'] = null;
};

export default instance;
