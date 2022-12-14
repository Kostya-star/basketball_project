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
  // console.log(PageSize);

  const [Name, setName] = useState('');

  // PERSIST URL---------------------
  useEffect(() => {
    // if (history.location.search) {
      const UrlString = history.location.search.substring(1);
      const { page, pageSize, name } = qs.parse(UrlString);

      const PAGE = Number(page) ? Number(page) : Number(Page);
      const PAGE_SIZE = Number(pageSize)
        ? Number(pageSize)
        : Number(PageSize) !== 25
        ? Number(PageSize)
        : 6;
      const SEARCH_VALUE = name && String(name);

        void dispatch(
          fetchTeams({
            Page: PAGE,
            PageSize: PAGE_SIZE,
            Name: SEARCH_VALUE,
          })
        );
        if (SEARCH_VALUE) {
          setName(String(SEARCH_VALUE));
        }
    // } else {
      
      // if (PageSize === 25) {
      //   console.log('mounted');
      //   void dispatch(fetchTeams({ Page, PageSize: 6 }));
      //   return;
      // }
      // used when logging in and switching back from a different page
    //   void dispatch(fetchTeams({ Page, PageSize }));
    // }
  }, []);

  useEffect(() => {
    const search = Name ? `&name=${Name}` : '';

    navigate(`?page=${Page}&pageSize=${PageSize}${search}`);
  }, [Page, PageSize, Name, teams]);

  // PAGINATION
  const onPageChange = (Page: number) => {
    void dispatch(fetchTeams({ Page, PageSize, Name }));
  };

  // PAGINATION SELECT
  const onPaginationSelectChange = (pageSize: string | ISelectOption[]) => {
    void dispatch(fetchTeams({ Page: 1, PageSize: Number(pageSize), Name }));
  };

  // SEARCH INPUT
  const onChangeInputHandle = (Name: string) => {
    setName(Name);
    void onChangeInput(Name);
  };

  const onChangeInput = useCallback(
    debounce((Name: string) => {
      console.log(PageSize);
      void dispatch(fetchTeams({ Page: 1, PageSize, Name }));
    }, 700),
    [Page, PageSize, Name]
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
