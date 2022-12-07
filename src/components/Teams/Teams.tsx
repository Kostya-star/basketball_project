import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchTeams, removeTeam } from '../../redux/slices/teamsSlice';
import { AddBtn } from '../AddBtn/AddBtn';
import { InputSearch } from '../InputSearch/InputSearch';
import teams__empty from '../../assets/img/TeamsEmpty/teams__empty.png';
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
    teamsCount: teams.count,
  }));

  const [searchValue, setSearchValue] = useState('');

  const history = createBrowserHistory();

  // PERSIST URL---------------------
  useEffect(() => {
    if (!history.location.search) {
      if (pageSize === 25) {
        void dispatch(fetchTeams(currentPage, 6, searchValue));
        return;
      }
      void dispatch(fetchTeams(currentPage, pageSize, searchValue));
    } else {
      const UrlString = history.location.search.substring(1);
      const UrlObjFromString = qs.parse(UrlString);

      if (UrlObjFromString.Page && UrlObjFromString.PageSize) {
        if (UrlObjFromString.Name) {
          void dispatch(
            fetchTeams(
              Number(UrlObjFromString.Page),
              Number(UrlObjFromString.PageSize),
              String(UrlObjFromString.Name)
            )
          );
          setSearchValue(String(UrlObjFromString.Name))
          return;
        }
        void dispatch(fetchTeams(Number(UrlObjFromString.Page), Number(UrlObjFromString.PageSize)));
      }
    }
  }, []);
  // -------------------

  useEffect(() => {
    const search = searchValue ? `&Name=${searchValue}` : '';

    navigate(`?Page=${currentPage}&PageSize=${pageSize}${search}`);
  }, [currentPage, pageSize, searchValue]);

  // PAGINATION
  const onPageChange = (currentPage: number) => {
    void dispatch(fetchTeams(currentPage, pageSize, searchValue));
  };

  // PAGINATION SELECT
  const onPaginationSelectChange = (pageSize: string) => {
    void dispatch(fetchTeams(currentPage, Number(pageSize), searchValue));
  };

  const paginationSelectOptions = [
    { value: 6, label: 6 },
    { value: 12, label: 12 },
    { value: 24, label: 24 },
  ];

  // SEARCH INPUT
  const onChangeInput = (searchValue: string) => {
    setSearchValue(searchValue);
    void dispatch(fetchTeams(currentPage, pageSize, searchValue));
  };

  const pagesAmount = Math.ceil(teamsCount / pageSize);

  const deleteTeam = (id: number) => {
    void dispatch(removeTeam(id));
  };

  const onRedirectCreateTeam = () => {
    return navigate('/TeamCreate');
  };

  return (
    <div className="common__container">
      <div className="common__header">
        <InputSearch value={searchValue} onChangeInput={onChangeInput} />
        <AddBtn onClick={onRedirectCreateTeam} />
      </div>

      {teams.length ? (
        <div className="common__filled_content">
          {teams?.map((team, index) => (
            <div
              key={index}
              onClick={() => deleteTeam(team.id)}
              className="common__filled_content__block"
            >
              <img src={`http://dev.trainee.dex-it.ru${team.imageUrl}`} alt="team" />
              <div>
                <p>{team.name}</p>
                <span>Year of foundation: {team.foundationYear}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="common__empty_content">
          <div className="common__empty_content__container">
            <div>
              <img src={teams__empty} alt="kids playing" />
              <p>Empty here</p>
              <span>Add new teams to continue</span>
            </div>
          </div>
        </div>
      )}

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
          menuPlacement={'top'}
          defaultValue={paginationSelectOptions.find((option) => option.value === 6)}
          value={paginationSelectOptions.find((option) => option.value === pageSize)}
          onChange={onPaginationSelectChange}
        />
      </div>
    </div>
  );
};
