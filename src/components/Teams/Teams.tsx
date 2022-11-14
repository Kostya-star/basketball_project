import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTeams, setTeams } from '../../redux/slices/teamsSlice';
import { useAppDispatch, useAppSelector } from './../../redux/hooks';

export const Teams = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { teams } = useAppSelector(({ teams }) => ({
    teams: teams.teams,
  }));

  useEffect(() => {
    void dispatch(fetchTeams())
  }, []);

  useEffect(() => {
    if(JSON.stringify(teams) === '[]') return navigate('/TeamsEmpty')
  }, [teams]);

  return (
    <div>
      Teams
    </div>
  );
};
