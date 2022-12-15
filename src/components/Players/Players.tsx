import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchPlayers, removePlayer } from '../../redux/slices/playersSlice';
import { AddBtn } from '../AddBtn/AddBtn';
import { SelectComponent } from '../FormComponents/SelectComponent';
import { InputSearch } from '../InputSearch/InputSearch';
import { fetchTeams } from './../../redux/slices/teamsSlice';
import { Card } from '../Card/Card';
import debounce from 'lodash.debounce';
import { createBrowserHistory } from 'history';
import qs from 'qs';
import { IPlayerData } from '../../types/players/players';
import players__empty from '../../assets/img/PlayersEmpty/players__empty.png';
import { Empty } from '../Empty/Empty';
import { Navigation } from '../Navigation/Navigation';
import { ISelectOption } from '../../types/ISelectOption';
import { ITeamsPlayersParams } from '../../types/IBaseParamsGetRequest';

export const Players = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const history = createBrowserHistory();

  const { players, teams, Page, PageSize, playersCount } = useAppSelector(({ players, teams }) => ({
    players: players.playersData.data,
    Page: players.playersData.page,
    PageSize: players.playersData.size,
    playersCount: players.playersData.count,
    teams: teams.data,
  }));

  const [Name, setName] = useState('');
  const [multiSelect, setMultiSelect] = useState('');

  // PERSISTING URL
  useEffect(() => {
    void dispatch(fetchTeams()).then(() => {
      const urlString = history.location.search.substring(1);
      const { page, pageSize, name, TeamIds } = qs.parse(urlString);

      let convertIdToString = ``;

      if (Array.isArray(TeamIds)) {
        TeamIds?.forEach((teamId) => {
          convertIdToString = convertIdToString.concat(`&TeamIds=${Number(teamId)}`);
        });
      } else {
        convertIdToString = convertIdToString.concat(`&TeamIds=${Number(TeamIds)}`);
      }

      const PAGE = page ? Number(page) : Number(Page);
      const PAGE_SIZE = pageSize
        ? Number(pageSize)
        : Number(PageSize) !== 25
        ? Number(PageSize)
        : 6;
      const SEARCH_VALUE = name ? String(name) : '';
      const TEAM_IDS = TeamIds ? String(convertIdToString) : '';

      void dispatch(
        fetchPlayers({
          Page: PAGE,
          PageSize: PAGE_SIZE,
          Name: SEARCH_VALUE,
          TeamIds: TEAM_IDS,
        })
      );
      setName(SEARCH_VALUE);
      setMultiSelect(TEAM_IDS);
    });
  }, []);

  // MOUNTING DATA INTO URL
  useEffect(() => {
    const search = Name ? `&name=${Name}` : '';

    navigate(`?page=${Page}&pageSize=${PageSize}${search}${multiSelect}`);
  }, [Page, PageSize, Name, multiSelect, players]);

  const onFetchPlayersHandler = (playersParams: ITeamsPlayersParams) => {
    const { page, pageSize, search, multiSelectVal } = playersParams;
    void dispatch(
      fetchPlayers({
        Page: page ?? Page,
        PageSize: pageSize ?? PageSize,
        Name: search ?? Name,
        TeamIds: multiSelectVal ?? multiSelect,
      })
    );
  };

  // PAGINATION
  const onPageChange = (page: number) => {
    onFetchPlayersHandler({ page });
  };

  // PAGINATION SELECT
  const onPaginationSelectChange = (pageSize: string | ISelectOption[]) => {
    onFetchPlayersHandler({ page: 1, pageSize: Number(pageSize) });
  };

  // SEARCH INPUT
  const onChangeInputHandle = (search: string) => {
    setName(search);
    void onChangeInput(search);
  };

  const onChangeInput = useCallback(
    debounce(async (search: string) => onFetchPlayersHandler({ page: 1, search }), 700),
    [Page, PageSize, multiSelect]
  );

  // MULTI SELECT
  const onChangeMultiSelect = (options: string | ISelectOption[]) => {
    let multiSelectVal = ``;

    if (Array.isArray(options)) {
      options?.forEach((o) => {
        multiSelectVal = multiSelectVal.concat(`&TeamIds=${o.id}`);
      });
    }

    setMultiSelect(multiSelectVal);
    onFetchPlayersHandler({ page: 1, multiSelectVal });
  };

  const teamsOptions = teams?.map((t) => ({ value: t.name, label: t.name, id: t.id }));

  // CREATING VALUE FOR MULTI SELECT
  const replaceString = multiSelect.replace(/&TeamIds=/g, ',').substring(1);
  const arrOfStrings = Array.from(replaceString.split(','));
  const arrOfValues = arrOfStrings.map((str) => Number(str));

  const multiSelectValues = teamsOptions.filter((teamOption) => {
    let val;
    arrOfValues.forEach((v) => {
      if (teamOption.id === v) {
        val = teamOption.id === v;
      }
    });
    return val;
  });
  // ------------------------
  // -------------------------

  const onRedirectCreatePlayer = () => {
    return navigate('/PlayersCreate');
  };

  const deletePlayer = (id: number) => {
    void dispatch(removePlayer(id)).then(() => {
      void dispatch(fetchPlayers({ Page, PageSize, Name }));
    });
  };

  let teamName = '';
  const mapTeamNamesForPlayers = (player: IPlayerData) => {
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].id === player.team) {
        teamName = teams[i].name;
      }
    }
  };

  return (
    <div className="common__container">
      <div className="common__header">
        <div className="common__header__group">
          <InputSearch value={Name} onChangeInput={onChangeInputHandle} />
          <SelectComponent<'multi_select'>
            name="multi_select"
            isMulti={true}
            options={teamsOptions}
            value={multiSelectValues}
            onChange={onChangeMultiSelect}
          />
        </div>
        <AddBtn onClick={onRedirectCreatePlayer} />
      </div>

      {players?.length ? (
        <div className="common__filled_content">
          {players?.map((player, index) => {
            mapTeamNamesForPlayers(player);
            return (
              <Card
                {...player}
                image={player.avatarUrl}
                deleteCard={deletePlayer}
                teamName={teamName}
                key={index}
              />
            );
          })}
        </div>
      ) : (
        <div className="common__empty_content">
          <Empty image={players__empty} text={'players'} />
        </div>
      )}

      {players?.length ? (
        <div className="common__pagination">
          <Navigation
            currentPage={Page}
            teamsPlayersCount={playersCount}
            PageSize={PageSize}
            onPageChange={onPageChange}
            onPaginationSelectChange={onPaginationSelectChange}
          />
        </div>
      ) : null}
    </div>
  );
};

// const teamNameObj = teams?.reduce((acc, team) => {
//   // @ts-expect-error
//   acc[team.id] = {
//     name: team.name,
//     id: team.id,
//   };
//   return acc;
// }, {});
