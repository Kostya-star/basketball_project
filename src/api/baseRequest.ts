import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://dev.trainee.dex-it.ru/api/',
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem('TOKEN')}`
  }
});