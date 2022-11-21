import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { fetchTeams, setTeams } from '../../redux/slices/teamsSlice';
import { AddBtn } from '../AddBtn/AddBtn';
import { InputSearch } from '../InputSearch/InputSearch';
import { useAppDispatch, useAppSelector } from './../../redux/hooks';
import '../../scss/teams_players_common.scss'
// import '../../assets/img'

export const Teams = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { teams } = useAppSelector(({ teams }) => ({
    teams: teams.data,
  }));
  
  
  useEffect(() => {
    void dispatch(fetchTeams())
  }, []);
  
  useEffect(() => {
    if(JSON.stringify(teams) === '[]') return navigate('/TeamsEmpty')
  }, [teams]);

  const mapTest = [1, 2, 3, 4, 5, 6]
  const teamImg = `../../assets/img/Header/header__logo.png`
  return (
    <div className='common__container'>
      <div className='common__header'>
        <InputSearch />
        <AddBtn />
      </div>

      <div className='common__filled_content'>
        {
          teams?.map((team, index) => <div
                                          className='common__filled_content__block'
                                          key={index}>
                                            <img src={'ccs'} alt="" />
                                            <p  >{team.imageUrl}</p>
                                          <span>{team.name}</span>
                                          <span>{team.foundationYear}</span>
                                        </div> )
        }
      </div>

    </div>
  );
};
