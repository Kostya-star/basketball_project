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
    if (history.location.search) {
      console.log(history.location.search);
      
      const UrlString = history.location.search.substring(1);
      const UrlObjFromString = qs.parse(UrlString);
      console.log(UrlObjFromString);

      if (UrlObjFromString.Page && UrlObjFromString.PageSize) {

        if (UrlObjFromString.Name) {
          setSearchValue(String(UrlObjFromString.Name));
          void dispatch(
            fetchTeams({
              Page: Number(UrlObjFromString.Page),
              PageSize: Number(UrlObjFromString.PageSize),
              Name: String(UrlObjFromString.Name),
            })
          );
          return;
        }
        void dispatch(
          fetchTeams({
            Page: Number(UrlObjFromString.Page),
            PageSize: Number(UrlObjFromString.PageSize),
          })
        );
      }
    } else {
      if (pageSize === 25) {
        void dispatch(fetchTeams({ Page: currentPage, PageSize: 6, Name: searchValue }));
        return;
      }
      // used when logging in
      void dispatch(fetchTeams({ Page: currentPage, PageSize: pageSize, Name: searchValue }));
    }
  }, []);

  useEffect(() => {
    const search = searchValue ? `&Name=${searchValue}` : '';

    navigate(`?Page=${currentPage}&PageSize=${pageSize}${search}`);
  }, [currentPage, pageSize, searchValue, teams]);

  // PAGINATION
  const onPageChange = (currentPage: number) => {
    void dispatch(fetchTeams({ Page: currentPage, PageSize: pageSize, Name: searchValue }));
  };

  // PAGINATION SELECT
  const onPaginationSelectChange = (pageSize: string) => {
    void dispatch(fetchTeams({ Page: 1, PageSize: Number(pageSize), Name: searchValue }));
  };

  // SEARCH INPUT
  const onChangeInput = (searchValue: string) => {
    setSearchValue(searchValue);
    void dispatch(fetchTeams({ Page: currentPage, PageSize: pageSize, Name: searchValue }));
  };

  const deleteTeam = (id: number) => {
    void dispatch(removeTeam(id));
  };

  const onRedirectCreateTeam = () => {
    return navigate('/TeamCreate');
  };

  const pagesAmount = Math.ceil(teamsCount / pageSize);

  const paginationSelectOptions = [
    { value: 6, label: 6, isDisabled: pageSize === 6 },
    { value: 12, label: 12, isDisabled: pageSize === 12 },
    { value: 24, label: 24, isDisabled: pageSize === 24 },
  ];

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

      {teams?.length ? (
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
      ) : null}
    </div>
  );
};
