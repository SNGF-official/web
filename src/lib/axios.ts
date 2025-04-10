import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL || 'https://sngf-silo.com',
  timeout: 10000,
  // headers: {
  //   'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
  // },
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('No Response:', error.request);
    } else {
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error); // Rejeter l'erreur pour la gérer plus haut dans la chaîne
  }
);

export { axiosInstance };
