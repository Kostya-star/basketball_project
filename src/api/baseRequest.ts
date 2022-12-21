import axios from 'axios';
import qs from 'qs';


export const baseRequestUrl = 'http://dev.trainee.dex-it.ru'

export const client = axios.create(
  {
    baseURL: `${baseRequestUrl}/api/`,
      // headers: {
      //     Authorization: `Bearer ${window.localStorage.getItem('TOKEN')}`
      //   }
    }
);

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('TOKEN');
  // @ts-expect-error
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  // config.paramsSerializer = {
  //   encode: (params) => qs.stringify(params, { arrayFormat: 'repeat' })
  // }
  return config;
});
