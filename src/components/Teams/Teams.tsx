import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTeams, removeTeam } from '../../redux/slices/teamsSlice';
import { AddBtn } from '../AddBtn/AddBtn';
import { InputSearch } from '../InputSearch/InputSearch';
import { useAppDispatch, useAppSelector } from './../../redux/hooks';
import '../../scss/teams_players_common.scss';
import { Pagination } from '../pagination/Pagination';
import qs from 'qs';
import { createBrowserHistory } from 'history';

export const Teams = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const history = createBrowserHistory();

  const {teams, currentPage, pageSize} = useAppSelector(({ teams }) => ({
    teams: teams.data,
    currentPage: teams.page,
    pageSize: teams.size
  }));

  const onFetchData = async (currentPage: number) => {
      const resp = await dispatch(fetchTeams(currentPage, pageSize));
      navigate(`/Teams?Page=${currentPage}&PageSize=${pageSize}`)
      if (!resp?.data.data.length) {
        return navigate('/TeamsEmpty');
      }

  };

  useEffect(() => {
    void onFetchData(currentPage);
  }, []);

  useEffect(() => {
    if (teams && !teams.length) {
      void onFetchData(currentPage);
    }
  }, [teams]);

  // PERSISTING THE URL PARAMS
  
  const deleteTeam = (id: number) => {
    void dispatch(removeTeam(id));
  };
  
  const onRedirectCreateTeam = () => {
    return navigate('/TeamCreate');
  };
  
  // PAGINATION ------------------------------------
  useEffect(() => {
    const URL = history.location.search.substring(1); 
    const params = qs.parse(URL)
    if(params.Page && params.PageSize) {
      console.log('USE EFFECT 1:',  params.Page, params.PageSize);
      
      void dispatch(fetchTeams(Number(params.Page), Number(params.PageSize)))
    }
  }, [])
  
  useEffect(() => {
    // console.log(currentPage, pageSize);
    console.log('USE EFFECT 2:',  currentPage, pageSize);
    navigate(`?Page=${currentPage}&PageSize=${pageSize}`)
  }, [currentPage, pageSize])
  
  const onPageChange = (currentPage: number) => {
    void onFetchData(currentPage)
  }

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
