import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const [Name, setName] = useState('');

  // PERSIST URL---------------------
  useEffect(() => {
    if (history.location.search) {
      const UrlString = history.location.search.substring(1);
      const { Page, PageSize, Name } = qs.parse(UrlString);

      const page = Number(Page);
      const pageSize = Number(PageSize);

      if (page && pageSize) {
        if (Name) {
          void dispatch(
            fetchTeams({
              Page: page,
              PageSize: pageSize,
              Name: String(Name),
            })
          );
          setName(String(Name));
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
  const pagesAmount = Math.ceil(teamsCount / PageSize);

  const onPaginationSelectChange = (pageSize: string | ISelectOption[]) => {
    void dispatch(fetchTeams({ Page: 1, PageSize: Number(pageSize), Name }));
  };

  // SEARCH INPUT
  const onChangeInput = useCallback(
    debounce((Name: string) => {
      void dispatch(fetchTeams({ Page: 1, PageSize, Name }));
    }, 700),
    []
  );

  const onChangeInputHandle = (Name: string) => {
    setName(Name);
    onChangeInput(Name);
  };

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
