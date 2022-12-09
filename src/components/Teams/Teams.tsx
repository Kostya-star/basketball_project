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

  const { teams, Page, PageSize, teamsCount } = useAppSelector(({ teams }) => ({
    teams: teams.data,
    Page: teams.page,
    PageSize: teams.size,
    teamsCount: teams.count,
  }));

  const [Name, setSearchName] = useState('');

  const history = createBrowserHistory();

  // PERSIST URL---------------------
  useEffect(() => {
    if (history.location.search) {
      const UrlString = history.location.search.substring(1);
      const { Page, PageSize, Name } = qs.parse(UrlString);

      const page = Number(Page)
      const pageSize = Number(PageSize)

      if (page && pageSize) {
        if (Name) {
          void dispatch(
            fetchTeams({
              Page: page,
              PageSize: pageSize,
              Name: String(Name),
            })
          );
          setSearchName(String(Name));
          return;
        }
        void dispatch(
          fetchTeams({
            Page: page,
            PageSize: pageSize,
          })
        );
      }
    } else {
      if (PageSize === 25) {
        void dispatch(fetchTeams({ Page, PageSize: 6, Name }));
        return;
      }
      // used when logging in and switching back from a different page
      void dispatch(fetchTeams({ Page, PageSize, Name }));
    }
  }, []);

  useEffect(() => {
    const search = Name ? `&Name=${Name}` : '';

    navigate(`?Page=${Page}&PageSize=${PageSize}${search}`);
  }, [Page, PageSize, Name, teams]);

  // PAGINATION
  const onPageChange = (Page: number) => {
    void dispatch(fetchTeams({ Page, PageSize, Name }));
  };

  // PAGINATION SELECT
  const onPaginationSelectChange = (pageSize: string) => {
    void dispatch(fetchTeams({ Page: 1, PageSize: Number(pageSize), Name }));
  };

  // SEARCH INPUT
  const onChangeInput = (Name: string) => {
    setSearchName(Name);
    void dispatch(fetchTeams({ Page: 1, PageSize, Name }));
  };

  const deleteTeam = (id: number) => {
    void dispatch(removeTeam(id));
  };

  const onRedirectCreateTeam = () => {
    return navigate('/TeamCreate');
  };

  const pagesAmount = Math.ceil(teamsCount / PageSize);

  const paginationSelectOptions = [
    { value: 6, label: 6, isDisabled: PageSize === 6 },
    { value: 12, label: 12, isDisabled: PageSize === 12 },
    { value: 24, label: 24, isDisabled: PageSize === 24 },
  ];

  return (
    <div className="common__container">
      <div className="common__header">
        <InputSearch value={Name} onChangeInput={onChangeInput} />
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
          <Pagination currentPage={Page} pagesAmount={pagesAmount} onPageChange={onPageChange} />
          <SelectComponent<'pagination_select'>
            name="pagination_select"
            isMulti={false}
            options={paginationSelectOptions}
            menuPlacement={'top'}
            defaultValue={paginationSelectOptions.find((option) => option.value === 6)}
            value={paginationSelectOptions.find((option) => option.value === PageSize)}
            onChange={onPaginationSelectChange}
          />
        </div>
      ) : null}
    </div>
  );
};
