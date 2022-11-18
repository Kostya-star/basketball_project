import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://dev.trainee.dex-it.ru/api/',
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem('TOKEN')}`
  }
});

axios.defaults.headers.common.Authorization = `Bearer ${window.localStorage.getItem('TOKEN')}`;
axios.defaults.headers.post.Authorization = `Bearer ${localStorage.getItem('TOKEN')}`
client.defaults.headers.common['Auth-Token'] = 'new token';