import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchTeams, removeTeam } from '../../redux/slices/teamsSlice';
import { AddBtn } from '../AddBtn/AddBtn';
import { InputSearch } from '../InputSearch/InputSearch';
import { useAppDispatch, useAppSelector } from './../../redux/hooks';
import '../../scss/teams_players_common.scss';
import { Pagination } from '../pagination/Pagination';
import qs from 'qs';
import { createBrowserHistory } from 'history';
import { SelectComponent } from '../FormComponents/SelectComponent';

export const Teams = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { teams, currentPage, pageSize, teamsCount } = useAppSelector(({ teams }) => ({
    teams: teams.data,
    currentPage: teams.page,
    pageSize: teams.size,
    teamsCount: teams.count
  }));

  const pagesAmount = Math.ceil(teamsCount / pageSize)

  // URL---------------------
  const history = createBrowserHistory();

  const onFetchTeams = (currentPage: number, pageSize: number) => {
    void dispatch(fetchTeams(currentPage, pageSize)).then((resp) => {
      if (!resp?.data.data.length) {
        return navigate('/TeamsEmpty');
      }
      navigate(`?Page=${currentPage}&PageSize=${pageSize}`);
    });
  };

  useEffect(() => {
    if(history.location.search) {
      const UrlString = history.location.search.substring(1);
      const UrlObjFromString = qs.parse(UrlString);
      if (UrlObjFromString.Page && UrlObjFromString.PageSize) {
        void dispatch(
          fetchTeams(Number(UrlObjFromString.Page), Number(UrlObjFromString.PageSize))
        ).then((resp) => {
          if (!resp?.data.data.length) {
            return navigate('/TeamsEmpty');
          }
          navigate(
            `?Page=${Number(UrlObjFromString.Page)}&PageSize=${Number(UrlObjFromString.PageSize)}`
          );
        });
      }
    } else {
      onFetchTeams(currentPage, pageSize)
    }
  }, []);

  useEffect(() => {
    navigate(`?Page=${currentPage}&PageSize=${pageSize}`);
  }, [currentPage, pageSize]);

  const onPageChange = (currentPage: number) => {
    onFetchTeams(currentPage, pageSize)
  };
  // ---------------------

  const deleteTeam = (id: number) => {
    void dispatch(removeTeam(id));
  };

  const onRedirectCreateTeam = () => {
    return navigate('/TeamCreate');
  };

  const paginationSelectOptions = [
    { value: 6, label: 6 },
    { value: 12, label: 12 },
    { value: 24, label: 24 }
  ]

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
      <div className="common__pagination">
        <Pagination
          currentPage={currentPage}
          pagesAmount={pagesAmount}
          onPageChange={onPageChange}
        />
        <SelectComponent<'pagination_select'>
          name="pagination_select"
          isMulti={false}
          options={paginationSelectOptions}
        />
      </div>
    </div>
  );
};
