import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setTeams } from '../../redux/slices/teamsSlice';
import { useAppDispatch, useAppSelector } from './../../redux/hooks';

export const Teams = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { teams } = useAppSelector(({ teams }) => ({
    teams: teams.teams,
  }));

  const getTeams = async () =>
    await axios
      .get('http://dev.trainee.dex-it.ru/api/Team/GetTeams', {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('TOKEN')}`,
        },
      })
      .then((resp) => {
        console.log(resp.data.data);

        if (JSON.stringify(resp.data.data) !== '[]') dispatch(setTeams(resp.data.data));
        else return navigate('/TeamsEmpty');
      })
      .catch((error) => {
        console.log(error);
        alert('error when fetching teams');
      });

  useEffect(() => {
    void getTeams();
  }, []);

  return (
    <div>
      Teams
    </div>
  );
};
