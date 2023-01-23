import axios from 'axios';

export const baseRequestUrl = 'http://dev.trainee.dex-it.ru';

export const client = axios.create({
  baseURL: `${baseRequestUrl}/api/`,
  paramsSerializer: {
    indexes: null,
  },
  headers: {
    "Access-Control-Allow-Origin": '*',
  }
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('TOKEN');
  // @ts-expect-error
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});
