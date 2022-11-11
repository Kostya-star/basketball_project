import axios from 'axios';
import { useEffect } from 'react';

export const Teams = () => {

  useEffect(() => {
    void axios.get('Team/GetTeams/')
    .then(resp => console.log(resp))
  }, []);

  // useEffect(() => {
  //   void fetch(
  //     'https://thawing-gorge-05089.herokuapp.com/http://dev.trainee.dex-it.ru/api/Team/GetTeams/')
  //     .then(async (resp) =>  await resp.json().then(data => console.log(data)))
  //   // .then(data => console.log(data))
  //   // void axios.get('https://thawing-gorge-05089.herokuapp.com/http://dev.trainee.dex-it.ru/api/Team/GetTeams/')
  //   //   .then(resp => console.log(resp))
  // }, []);

  return <div>Teams</div>;
};
