import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTeams, removeTeam } from '../../redux/slices/teamsSlice';
import { AddBtn } from '../AddBtn/AddBtn';
import { InputSearch } from '../InputSearch/InputSearch';
import { useAppDispatch, useAppSelector } from './../../redux/hooks';
import '../../scss/teams_players_common.scss';

export const Teams = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { teams } = useAppSelector(({ teams }) => ({
    teams: teams.data,
  }));
  
  const onFetchData = () => {
    const fetchData = async () => {
      const resp = await dispatch(fetchTeams());
      if(JSON.stringify(resp?.data.data) === '[]') return navigate('/TeamsEmpty')
    };
    fetchData().catch(error => console.log(error));
  }

  useEffect(() => {
    onFetchData()
  }, []);
  
  useEffect(() => {
    if(JSON.stringify(teams) === '[]') {
      onFetchData()
    } 
  }, [teams]);
    
  const deleteTeam = (id: number) => {
    void dispatch(removeTeam(id))
  }

  const onRedirectCreateTeam = () => {
    return navigate('/TeamCreate')
  }

  return (
    <div className="common__container">
      <div className="common__header">
        <InputSearch />
        <AddBtn onRedirect={onRedirectCreateTeam} />
      </div>

      <div className="common__filled_content">
        {teams?.map((team, index) => (
          <div
            onClick={() => deleteTeam(team.id)}
            className="common__filled_content__block"
            key={index}
          >
            <img src={`http://dev.trainee.dex-it.ru${team.imageUrl}`} alt="team" />
            <div>
              <p>{team.name}</p>
              <span>Year of foundation: {team.foundationYear}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
