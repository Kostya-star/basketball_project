import { useCallback, useEffect, useRef, useState } from 'react';
import { useHref, useNavigate } from 'react-router-dom';
import { fetchTeams, getTeam, removeTeam } from '../../redux/slices/teamsSlice';
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
import { ITeamsParamsGetRequest, ITeamsPlayersParams } from './../../types/IBaseParamsGetRequest';

export const Teams = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const history = createBrowserHistory();

  const { teams, currentPage, pageSize, teamsCount } = useAppSelector(({ teams }) => ({
    teams: teams.data,
    currentPage: teams.page,
    pageSize: teams.size,
    teamsCount: teams.count,
  }));

  const [teamsParams, setTeamsParams] = useState<ITeamsPlayersParams>({});
  const [Name, setName] = useState('');

  const onMount = useRef({
    isMounting: true,
    isMounted: false,
  });

  // PERSIST URL---------------------
  useEffect(() => {
    const { Page, PageSize, Name } = qs.parse(
      history.location.search.substring(1)
    ) as ITeamsParamsGetRequest;

    const PAGE = Page ?? currentPage;
    const PAGE_SIZE = PageSize ?? (pageSize !== 25 ? pageSize : 6);
    const SEARCH_VALUE = Name ? `&Name=${Name}` : '';

    void dispatch(
      fetchTeams({
        Page: PAGE,
        PageSize: PAGE_SIZE,
        Name,
      })
    ).then(() => navigate(`?Page=${PAGE}&PageSize=${PAGE_SIZE}${SEARCH_VALUE}`));

    setTeamsParams({
      page: PAGE,
      itemsPerPage: PAGE_SIZE,
      search: Name ?? '',
    });

    setName(Name ?? '');
  }, []);

  // MOUNTING PARAMS INTO URL
  useEffect(() => {
    if (!onMount.current.isMounting) {
      if (onMount.current.isMounted) {
        const { page, itemsPerPage, search } = teamsParams;

        const SEARCH = Name ? `&Name=${Name}` : '';

        void dispatch(
          fetchTeams({
            Page: page,
            PageSize: itemsPerPage,
            Name: search,
          })
        );

        navigate(`?Page=${page}&PageSize=${itemsPerPage}${SEARCH}`);
      }
      onMount.current.isMounted = true;
    }
    onMount.current.isMounting = false;
  }, [teamsParams]);

  // PAGINATION
  const onPageChange = (page: number) => {
    setTeamsParams((rest) => ({
      ...rest,
      page,
    }));
  };

  // PAGINATION SELECT
  const onPaginationSelectChange = (pageSize: string) => {
    setTeamsParams((rest) => ({
      ...rest,
      page: 1,
      itemsPerPage: Number(pageSize),
    }));
  };

  // SEARCH INPUT
  const onChangeInputHandle = (search: string) => {
    setName(search);

    void onChangeInput(search);
  };

  const onChangeInput = useCallback(
    debounce((search: string) => {
      setTeamsParams((rest) => ({ ...rest, page: 1, search }));
    }, 700),
    [teamsParams.page, teamsParams.itemsPerPage]
  );

  // -----------------------

  const onRedirectTeamDetails = (id: number) => {
    return navigate(`/TeamDetails?id=${id}`);
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
            <Card {...team} image={team.imageUrl} onClick={onRedirectTeamDetails} key={index} />
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
            currentPage={currentPage}
            teamsPlayersCount={teamsCount}
            PageSize={pageSize}
            onPageChange={onPageChange}
            onPaginationSelectChange={onPaginationSelectChange}
          />
        </div>
      ) : null}
    </div>
  );
};
