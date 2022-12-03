import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTeams, removeTeam, setCurrentPage } from '../../redux/slices/teamsSlice';
import { AddBtn } from '../AddBtn/AddBtn';
import { InputSearch } from '../InputSearch/InputSearch';
import { useAppDispatch, useAppSelector } from './../../redux/hooks';
import '../../scss/teams_players_common.scss';
import { Pagination } from '../pagination/Pagination';

export const Teams = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {teams, currentPage} = useAppSelector(({ teams }) => ({
    teams: teams.data,
    currentPage: teams.page
  }));

  const onFetchData = async () => {
    const resp = await dispatch(fetchTeams(currentPage));
    if (!resp?.data.data.length) return navigate('/TeamsEmpty');
  };

  useEffect(() => {
    void onFetchData();
  }, []);

  useEffect(() => {
    if (teams && !teams.length) {
      void onFetchData();
    }
  }, [teams]);

  const deleteTeam = (id: number) => {
    void dispatch(removeTeam(id));
  };

  const onRedirectCreateTeam = () => {
    return navigate('/TeamCreate');
  };

  // PAGINATION ------------------------------------

  const onPageChange = (currentPage: number) => {
    dispatch(setCurrentPage(currentPage))
  }

  useEffect(() => {
    void onFetchData()
  }, [currentPage])

  return (
    <div className="common__container">
      <div className="common__header">
        <InputSearch />
        <AddBtn onClick={onRedirectCreateTeam} />
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
      <Pagination currentPage={currentPage} onPageChange={onPageChange}/>
    </div>
  );
};
