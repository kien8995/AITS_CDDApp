import axios from 'axios';
import apiConfig from '../config/api.config';
import history from './history';
// import Raven from 'raven-js';

export const aitsClient = () => {
  const options = {
    baseURL: apiConfig.baseURL,
    timeout: apiConfig.timeout,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/vnd.oracle.adf.resourceitem+json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  options.headers.Authorization = `Bearer ${localStorage.getItem(apiConfig.jwtKey)}`;

  const client = axios.create(options);

  // Add a request interceptor
  client.interceptors.request.use(
    requestConfig => requestConfig,
    requestError =>
      // Raven.captureException(requestError);
      Promise.reject(requestError),
  );

  // Add a response interceptor
  client.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status >= 500) {
        // Raven.captureException(error);
      }

      if (error.response.status === 401 || error.response.status === 403) {
        localStorage.removeItem(apiConfig.jwtKey);
        history.push('/login');
      }

      return Promise.reject(error);
    },
  );

  return client;
};
