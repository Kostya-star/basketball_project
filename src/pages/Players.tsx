import players__empty from 'assets/img/PlayersEmpty/players__empty.png';
import { AddBtn } from 'components/AddBtn/AddBtn';
import { Card } from 'components/Card/Card';
import { Empty } from 'components/Empty/Empty';
import { InputSearch } from 'components/InputSearch/InputSearch';
import { InputSelect } from 'components/InputSelect/InputSelect';
import { Navigation } from 'components/Navigation/Navigation';
import { createBrowserHistory } from 'history';
import debounce from 'lodash.debounce';
import qs from 'qs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchPlayers } from 'redux/slices/playersSlice';
import { fetchTeams } from 'redux/slices/teamsSlice';
import { IPlayersParamsGetRequest, ITeamsPlayersParams } from 'types/IBaseParamsGetRequest';
import { ISelectOption } from 'types/ISelectOption';
import { IPlayerData } from 'types/players/players';

export const Players = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const history = createBrowserHistory();

  const { players, teams, currentPage, pageSize, playersCount } = useAppSelector(
    ({ players, teams }) => ({
      players: players.playersData.data,
      currentPage: players.playersData.page,
      pageSize: players.playersData.size,
      playersCount: players.playersData.count,
      teams: teams.data,
    })
  );

  const [playersParams, setPlayersParams] = useState<ITeamsPlayersParams>({});

  const [searchInputValue, setSearchInputValue] = useState('');

  const isMounted = useRef<null | boolean>(null);

  const teamsOptions = teams?.map((t) => ({ value: t.name, label: t.name, id: t.id }));

  // GETTING TEAMS AND MOUNTING HISTORY INTO URL
  useEffect(() => {
    void dispatch(fetchTeams()).then(() => {
      const { Page, PageSize, Name, TeamIds } = qs.parse(
        history.location.search.substring(1)
      ) as IPlayersParamsGetRequest;

      const PAGE = Page ?? currentPage;
      const PAGE_SIZE = PageSize ?? (pageSize !== 25 ? pageSize : 6);
      const SEARCH = Name ? `&Name=${Name}` : '';
      const TEAMIDS_INTO_STRING =
        (Array.isArray(TeamIds) &&
          TeamIds.map((id) => `TeamIds=${id}`)
            .join('&')
            .replace('', '&')) ||
        (typeof TeamIds === 'string' && [TeamIds].map((id) => `&TeamIds=${id}`).join('')) ||
        '';

        isMounted.current = false;
      navigate(`?Page=${PAGE}&PageSize=${PAGE_SIZE}${SEARCH}${TEAMIDS_INTO_STRING}`);
    });
  }, []);

  // RETREIVING VALUES
  useEffect(() => {
    
    if (isMounted.current === false) {
      console.log('asd');
      if (teams.length) {
        const { Page, PageSize, Name, TeamIds } = qs.parse(
          history.location.search.substring(1)
        ) as IPlayersParamsGetRequest;

        const TEAM_IDS_INTO_ARRAY =
          (typeof TeamIds === 'string' && teamsOptions.filter((t) => t.id === Number(TeamIds))) ||
          (Array.isArray(TeamIds) &&
            teamsOptions.filter((t) => TeamIds.some((id) => t.id === Number(id)))) ||
          '';


        void dispatch(
          fetchPlayers({
            Page,
            PageSize,
            Name,
            TeamIds,
          })
        );

        setPlayersParams({
          page: Page,
          itemsPerPage: PageSize,
          search: Name ?? '',
          multiSelectVal: TEAM_IDS_INTO_ARRAY as ISelectOption[],
        });

        setSearchInputValue(Name ?? '');
      }
    }
  }, [history.location.search]);

  // GETTING CERTAIN PLAYERS AND MOUNTING MODIFYING THE URL
  useEffect(() => {
    if (isMounted.current) {
      const { page, itemsPerPage, search, multiSelectVal } = playersParams;

      const TEAM_IDS = multiSelectVal?.length ? multiSelectVal?.map((o) => String(o.id)) : '';
      const TEAM_IDS_URL = multiSelectVal?.length
        ? multiSelectVal.map((o) => `&TeamIds=${o.id}`).join('')
        : '';
      const SEARCH = search ? `&Name=${search}` : '';

      void dispatch(
        fetchPlayers({
          Page: page,
          PageSize: itemsPerPage,
          Name: search,
          TeamIds: TEAM_IDS,
        })
      );

      navigate(`?Page=${page}&PageSize=${itemsPerPage}${SEARCH}${TEAM_IDS_URL}`);
    }
    isMounted.current = true;
  }, [playersParams]);

  // PAGINATION
  const onPageChange = (page: number) => {
    setPlayersParams((rest) => ({
      ...rest,
      page,
    }));
  };

  // PAGINATION SELECT
  const onPaginationSelectChange = (pageSize: string) => {
    setPlayersParams((rest) => ({
      ...rest,
      page: 1,
      itemsPerPage: Number(pageSize),
    }));
  };

  // SEARCH INPUT
  const onChangeInputHandle = (search: string) => {
    setSearchInputValue(search);

    void onChangeInput(search);
  };

  const onChangeInput = useCallback(
    debounce(async (search: string) => {
      setPlayersParams((rest) => ({
        ...rest,
        page: 1,
        search,
      }));
    }, 700),
    [playersParams.page, playersParams.itemsPerPage, playersParams.multiSelectVal]
  );

  // MULTI SELECT
  const onChangeMultiSelect = (multiSelectVal: ISelectOption[]) => {
    setPlayersParams((rest) => ({
      ...rest,
      page: 1,
      multiSelectVal,
    }));
  };

  const onRedirectCreatePlayer = () => {
    return navigate('/PlayersCreate');
  };

  let teamName = '';
  const mapTeamNamesForPlayers = (player: IPlayerData) => {
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].id === player.team) {
        teamName = teams[i].name;
      }
    }
  };

  const onRedirectPlayerDetails = (id: number) => {
    navigate(`/PlayerDetails?id=${id}`);
  };

  return (
    <div className="common__container">
      <div className="common__header">
        <div className="common__header__group">
          <InputSearch value={searchInputValue} onChangeInput={onChangeInputHandle} />
          <InputSelect<'multi_select'>
            name="multi_select"
            isMulti={true}
            options={teamsOptions}
            value={playersParams?.multiSelectVal}
            border={true}
            onChangeMulti={onChangeMultiSelect}
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
                onClick={onRedirectPlayerDetails}
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
            currentPage={currentPage}
            teamsPlayersCount={playersCount}
            PageSize={pageSize}
            onPageChange={onPageChange}
            onPaginationSelectChange={onPaginationSelectChange}
          />
        </div>
      ) : null}
    </div>
  );
};

// // const teamNameObj = teams?.reduce((acc, team) => {
// //   // @ts-expect-error
// //   acc[team.id] = {
// //     name: team.name,
// //     id: team.id,
// //   };
// //   return acc;
// // }, {});
