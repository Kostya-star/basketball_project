import axios from 'axios';

export const client = axios.create(
  {
    baseURL: 'http://dev.trainee.dex-it.ru/api/',
    // headers: {
      //   Authorization: `Bearer ${window.localStorage.getItem('TOKEN')}`
      // }
    }
);

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('TOKEN');
  // @ts-expect-error
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});
