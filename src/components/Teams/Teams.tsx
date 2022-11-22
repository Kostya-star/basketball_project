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
  
  
  useEffect(() => {
    void dispatch(fetchTeams())
  }, []);

  useEffect(() => {
    if(JSON.stringify(teams) === '[]') return navigate('/TeamsEmpty')
  }, [teams]);

  const deleteTeam = (id: number) => {
    void dispatch(removeTeam(id))
  }

  return (
    <div className='common__container'>
      <div className='common__header'>
        <InputSearch />
        {/* <AddBtn /> */}
      </div>

      <div className='common__filled_content'>
        {
          teams?.map((team, index) => <div
                                          onClick={() => deleteTeam(team.id)}
                                          className='common__filled_content__block'
                                          key={index}>
                                            <img src={`http://dev.trainee.dex-it.ru${team.imageUrl}`} alt="team" />
                                            <div>
                                              <p>{team.name}</p>
                                              <span>Year of foundation: {team.foundationYear}</span>
                                            </div>
                                        </div> )
        }
      </div>

    </div>
  );
};
