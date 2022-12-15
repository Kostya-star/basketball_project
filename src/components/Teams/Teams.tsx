import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTeams, removeTeam } from '../../redux/slices/teamsSlice';
import { AddBtn } from '../AddBtn/AddBtn';
import { InputSearch } from '../InputSearch/InputSearch';
import teams__empty from '../../assets/img/TeamsEmpty/teams__empty.png';
import { useAppDispatch, useAppSelector } from './../../redux/hooks';
import '../../scss/teams_players_common.scss';
import qs from 'qs';
import { createBrowserHistory } from 'history';
import debounce from 'lodash.debounce';
import { Card } from '../Card/Card';
import { Empty } from '../Empty/Empty';
import { ISelectOption } from '../../types/ISelectOption';
import { Navigation } from '../Navigation/Navigation';
import { ITeamsPlayersParams } from '../../types/IBaseParamsGetRequest';

export const Teams = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const history = createBrowserHistory();

  const { teams, Page, PageSize, teamsCount } = useAppSelector(({ teams }) => ({
    teams: teams.data,
    Page: teams.page,
    PageSize: teams.size,
    teamsCount: teams.count,
  }));

  const [Name, setName] = useState('');

  // PERSIST URL---------------------
  useEffect(() => {
    const UrlString = history.location.search.substring(1);
    const { page, pageSize, name } = qs.parse(UrlString);

    const PAGE = page ? Number(page) : Number(Page);
    const PAGE_SIZE = pageSize ? Number(pageSize) : Number(PageSize) !== 25 ? Number(PageSize) : 6;
    const SEARCH_VALUE = name ? String(name) : '';

    void dispatch(
      fetchTeams({
        Page: PAGE,
        PageSize: PAGE_SIZE,
        Name: SEARCH_VALUE,
      })
    );

    setName(SEARCH_VALUE);
  }, []);

  // MOUNTING PARAMS INTO URL
  useEffect(() => {
    const search = Name ? `&name=${Name}` : '';

    navigate(`?page=${Page}&pageSize=${PageSize}${search}`);
  }, [Page, PageSize, Name, teams]);

  const onFetchTeamsHandler = (teamsParams: ITeamsPlayersParams) => {
    const { page, pageSize, search } = teamsParams;
    void dispatch(
      fetchTeams({ Page: page ?? Page, PageSize: pageSize ?? PageSize, Name: search ?? Name })
    );
  };

  // PAGINATION
  const onPageChange = (page: number) => {
    onFetchTeamsHandler({ page });
  };

  // PAGINATION SELECT
  const onPaginationSelectChange = (pageSize: string | ISelectOption[]) => {
    onFetchTeamsHandler({ pageSize: Number(pageSize), page: 1 });
  };

  // SEARCH INPUT
  const onChangeInputHandle = (search: string) => {
    setName(search);
    void onChangeInput(search);
  };

  const onChangeInput = useCallback(
    debounce((search: string) => {
      onFetchTeamsHandler({ search, page: 1 });
    }, 700),
    [Page, PageSize]
  );

  // -----------------------

  const deleteTeam = (id: number) => {
    void dispatch(removeTeam(id));
  };

  const onRedirectCreateTeam = () => {
    return navigate('/TeamCreate');
  };

  return (
    <div className="common__container">
      <div className="common__header">
        <InputSearch value={Name} onChangeInput={onChangeInputHandle} />
        <AddBtn onClick={onRedirectCreateTeam} />
      </div>

      {teams?.length ? (
        <div className="common__filled_content">
          {teams?.map((team, index) => (
            <Card {...team} image={team.imageUrl} deleteCard={deleteTeam} key={index} />
          ))}
        </div>
      ) : (
        <div className="common__empty_content">
          <Empty image={teams__empty} text={'teams'} />
        </div>
      )}

      {teams?.length ? (
        <div className="common__pagination">
          <Navigation
            currentPage={Page}
            teamsPlayersCount={teamsCount}
            PageSize={PageSize}
            onPageChange={onPageChange}
            onPaginationSelectChange={onPaginationSelectChange}
          />
        </div>
      ) : null}
    </div>
  );
};
