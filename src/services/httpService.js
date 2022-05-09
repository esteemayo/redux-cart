import axios from 'axios';
import { toast } from 'react-toastify';

import logger from './logService';

const authFetch = axios.create({
  baseURL: 'https://course-api.com/react-useReducer-cart-project',
  Accept: 'application/json',
});

authFetch.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error('An unexpected error occurred');
  }

  return Promise.reject(error);
});

const http = {
  get: authFetch.get,
  post: authFetch.post,
  patch: authFetch.patch,
  delete: authFetch.delete,
};

export default http;
