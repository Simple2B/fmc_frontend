import axios, { AxiosInstance } from 'axios';

const API_URI = process.env.NEXT_PUBLIC_API_URL;

export const instance = (): AxiosInstance => {
  const token = localStorage.getItem('token') ?? '';
  return axios.create({
    baseURL: API_URI,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type, Authorization, X-Requested-With',
    },
  });
};

export const authInstance: AxiosInstance = axios.create({
  baseURL: API_URI,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
  },
});

export const applicationInstance = (): AxiosInstance =>
  axios.create({
    baseURL: API_URI,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH',
      'Access-Control-Allow-Origin': '*',
    },
  });

export const instanceFormData = (): AxiosInstance => {
  const token = localStorage.getItem('token') ?? '';
  return axios.create({
    baseURL: API_URI,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type, Authorization, X-Requested-With',
    },
  });
};
