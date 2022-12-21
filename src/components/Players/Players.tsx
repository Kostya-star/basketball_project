// import { useEffect, useState, useCallback, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { fetchPlayers, removePlayer } from '../../redux/slices/playersSlice';
// import { AddBtn } from '../AddBtn/AddBtn';
// import { SelectComponent } from '../FormComponents/SelectComponent';
// import { InputSearch } from '../InputSearch/InputSearch';
// import { fetchTeams } from './../../redux/slices/teamsSlice';
// import { Card } from '../Card/Card';
// import debounce from 'lodash.debounce';
// import { createBrowserHistory } from 'history';
// import qs from 'qs';
// import { IPlayerData } from '../../types/players/players';
// import players__empty from '../../assets/img/PlayersEmpty/players__empty.png';
// import { Empty } from '../Empty/Empty';
// import { Navigation } from '../Navigation/Navigation';
// import { ISelectOption } from '../../types/ISelectOption';
// import { IPlayersParamsGetRequest, ITeamsPlayersParams } from '../../types/IBaseParamsGetRequest';

// export const Players = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const history = createBrowserHistory();

//   const { players, teams, currentPage, pageSize, playersCount } = useAppSelector(
//     ({ players, teams }) => ({
//       players: players.playersData.data,
//       currentPage: players.playersData.page,
//       pageSize: players.playersData.size,
//       playersCount: players.playersData.count,
//       teams: teams.data,
//     })
//   );

//   const [playersParams, setPlayersParams] = useState<ITeamsPlayersParams>({});

//   const [searchInputValue, setSearchInputValue] = useState('')

//   const isMounted = useRef<null | boolean>(null);

//   // PERSISTING URL

//   const teamsOptions = teams?.map((t) => ({ value: t.name, label: t.name, id: t.id }));

//   const onFetchPlayersHandle = (params: IPlayersParamsGetRequest) => {
//     const Page = params.Page ? params.Page : currentPage;
//     const PageSize = params.PageSize ? params.PageSize : pageSize;

    
//     void dispatch(
//       fetchPlayers({
//         Page,
//         PageSize,
//         Name: params.Name,
//         TeamIds: params.TeamIds,
//       })
//       );
      
//       const Name = params.Name ? `&Name=${params.Name}` : '';
//       let TEAMIDS_INTO_STRING =
//       (typeof params.TeamIds === 'object' &&
//       params.TeamIds.map((t) => `TeamIds=${Number(t)}`)
//       .join('&')
//       .replace('', '&')) ||
//       (typeof params.TeamIds === 'string' &&
//       [Number(params.TeamIds)].map((id) => `&TeamIds=${id}`).join('')) ||
//       '';
//       if (TEAMIDS_INTO_STRING === '&TeamIds=0') TEAMIDS_INTO_STRING = '';
      
//     navigate(`?Page=${Page}&PageSize=${PageSize}${Name}${TEAMIDS_INTO_STRING}`);
//   };

//   useEffect(() => {
//     void dispatch(fetchTeams()).then(() => {
//       const { Page, PageSize, Name, TeamIds } = qs.parse(history.location.search.substring(1));

//       onFetchPlayersHandle({
//         Page: Number(Page),
//         PageSize: Number(PageSize),
//         Name: Name as string,
//         TeamIds: TeamIds as string | string[],
//       });

//       isMounted.current = false;
//     });
//   }, []);

//   // MOUNTING DATA INTO URL

//   useEffect(() => {
//     if (isMounted.current === false) {
//       if (teams.length) {
//         // console.log(history.location.search);
//         // console.log(teams);
        
//         const { Page, PageSize, Name, TeamIds } = qs.parse(history.location.search.substring(1));

//         const search = Name ? String(Name) : '';

//         const TEAM_IDS_INTO_ARRAY =
//           (typeof TeamIds === 'string' && teamsOptions.filter((t) => t.id === Number(TeamIds))) ||
//           (typeof TeamIds === 'object' &&
//             // @ts-expect-error
//             teamsOptions.filter((t) => TeamIds.some((id: string) => t.id === Number(id)))) ||
//           '';

//         setPlayersParams({
//           page: Number(Page),
//           itemsPerPage: Number(PageSize),
//           search,
//           multiSelectVal: TEAM_IDS_INTO_ARRAY as ISelectOption[],
//         });
//         setSearchInputValue(search)
//       }
//     }
//   }, [history.location.search]);

//   useEffect(() => {
//     if (isMounted.current) {
//       const { page, itemsPerPage, search, multiSelectVal } = playersParams;
      
//       const TEAM_IDS = multiSelectVal?.length ? multiSelectVal.map((o) => String(o.id)) : '';
      
//       onFetchPlayersHandle({ Page: page, PageSize: itemsPerPage, Name: search, TeamIds: TEAM_IDS });
//     }
//     isMounted.current = true;
//   }, [playersParams]);

//   // PAGINATION
//   const onPageChange = (page: number) => {
//     setPlayersParams((rest) => ({
//       ...rest,
//       page,
//     }));
//   };

//   // PAGINATION SELECT
//   const onPaginationSelectChange = (pageSize: string) => {
//     setPlayersParams((rest) => ({
//       ...rest,
//       page: 1,
//       itemsPerPage: Number(pageSize),
//     }));
//   };

//   // SEARCH INPUT
//   const onChangeInputHandle = (search: string) => {
//     setSearchInputValue(search)

//     void onChangeInput(search);
//   };

//   const onChangeInput = useCallback(
//     debounce(async (search: string) => {
//       setPlayersParams((rest) => ({
//         ...rest,
//         page: 1,
//         search,
//       }));
//     }, 700),
//     [playersParams.page, playersParams.itemsPerPage, playersParams.multiSelectVal]
//   );

//   // MULTI SELECT
//   const onChangeMultiSelect = (multiSelectVal: ISelectOption[]) => {
//     setPlayersParams((rest) => ({
//       ...rest,
//       page: 1,
//       multiSelectVal,
//     }));
//   };

//   const onRedirectCreatePlayer = () => {
//     return navigate('/PlayersCreate');
//   };

//   const deletePlayer = (id: number) => {
//     void dispatch(removePlayer(id)).then(() => {
//       void dispatch(fetchPlayers({ Page: currentPage, PageSize: pageSize }));
//     });
//   };

//   let teamName = '';
//   const mapTeamNamesForPlayers = (player: IPlayerData) => {
//     for (let i = 0; i < teams.length; i++) {
//       if (teams[i].id === player.team) {
//         teamName = teams[i].name;
//       }
//     }
//   };

//   return (
//     <div className="common__container">
//       <div className="common__header">
//         <div className="common__header__group">
//           <InputSearch value={searchInputValue} onChangeInput={onChangeInputHandle} />
//           <SelectComponent<'multi_select'>
//             name="multi_select"
//             isMulti={true}
//             options={teamsOptions}
//             value={playersParams?.multiSelectVal}
//             onChangeMulti={onChangeMultiSelect}
//           />
//         </div>
//         <AddBtn onClick={onRedirectCreatePlayer} />
//       </div>

//       {players?.length ? (
//         <div className="common__filled_content">
//           {players?.map((player, index) => {
//             mapTeamNamesForPlayers(player);
//             return (
//               <Card
//                 {...player}
//                 image={player.avatarUrl}
//                 deleteCard={deletePlayer}
//                 teamName={teamName}
//                 key={index}
//               />
//             );
//           })}
//         </div>
//       ) : (
//         <div className="common__empty_content">
//           <Empty image={players__empty} text={'players'} />
//         </div>
//       )}

//       {players?.length ? (
//         <div className="common__pagination">
//           <Navigation
//             currentPage={currentPage}
//             teamsPlayersCount={playersCount}
//             PageSize={pageSize}
//             onPageChange={onPageChange}
//             onPaginationSelectChange={onPaginationSelectChange}
//           />
//         </div>
//       ) : null}
//     </div>
//   );
// };

// // // const teamNameObj = teams?.reduce((acc, team) => {
// // //   // @ts-expect-error
// // //   acc[team.id] = {
// // //     name: team.name,
// // //     id: team.id,
// // //   };
// // //   return acc;
// // // }, {});
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
import { IPlayersParamsGetRequest, ITeamsPlayersParams } from '../../types/IBaseParamsGetRequest';


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

  const [searchInputValue, setSearchInputValue] = useState('')

  const isMounted = useRef<null | boolean>(null);

  // PERSISTING URL

  const teamsOptions = teams?.map((t) => ({ value: t.name, label: t.name, id: t.id }));


  useEffect(() => {
    void dispatch(fetchTeams()).then(() => {
      const { Page, PageSize, Name, TeamIds } = qs.parse(history.location.search.substring(1));

        const SEARCH = Name ? `&Name=${Name as string}` : '';
        const TEAMIDS_INTO_STRING =
        (typeof TeamIds === 'object' &&
        // @ts-expect-error
        TeamIds.map((t: string) => `TeamIds=${Number(t)}`)
        .join('&')
        .replace('', '&')) ||
        (typeof TeamIds === 'string' &&
        [Number(TeamIds)].map((id) => `&TeamIds=${id}`).join('')) ||
        '';
  
  
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        navigate(`?Page=${Page ?? currentPage}&PageSize=${PageSize ?? pageSize}${SEARCH}${TEAMIDS_INTO_STRING}`);
      isMounted.current = false;
    });
  }, []);

  // MOUNTING DATA INTO URL

  useEffect(() => {
    if (isMounted.current === false) {
      if (teams.length) {
        console.log(history.location.search);
        console.log(teams);
        
        const { Page, PageSize, Name, TeamIds } = qs.parse(history.location.search.substring(1));

        const search = Name ? String(Name) : '';

        const TEAM_IDS_INTO_ARRAY =
          (typeof TeamIds === 'string' && teamsOptions.filter((t) => t.id === Number(TeamIds))) ||
          (typeof TeamIds === 'object' &&
            // @ts-expect-error
            teamsOptions.filter((t) => TeamIds.some((id: string) => t.id === Number(id)))) ||
          '';
          void dispatch(
            fetchPlayers({
              Page: Page ? Number(Page) : currentPage,
              PageSize: PageSize ? Number(PageSize) : pageSize,
              Name: Name as string,
              TeamIds: TeamIds as string | string[],
            })
            );

        setPlayersParams({
          page: Number(Page),
          itemsPerPage: Number(PageSize),
          search,
          multiSelectVal: TEAM_IDS_INTO_ARRAY as ISelectOption[],
        });
        setSearchInputValue(search)
      }
    }
  }, [history.location.search]);

  useEffect(() => {
    if (isMounted.current) {
      const { page, itemsPerPage, search, multiSelectVal } = playersParams;
      
      const TEAM_IDS = multiSelectVal ? multiSelectVal?.map((o) => o.id) : '';
      const TEAM_IDS_URL = multiSelectVal?.length ? multiSelectVal.map((o) => `&TeamIds=${o.id}`).join('') : ''

      
      void dispatch(
        fetchPlayers({
          Page: page,
          PageSize: itemsPerPage,
          Name: search,
          // @ts-expect-error
          TeamIds: TEAM_IDS,
        })
      );

      const SEARCH = search ? `&Name=${search}` : '';
      navigate(`?Page=${page}&PageSize=${itemsPerPage}${SEARCH}${TEAM_IDS_URL}`);
      // onFetchPlayersHandle({ Page: page, PageSize: itemsPerPage, Name: search, TeamIds: TEAM_IDS });
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
    setSearchInputValue(search)

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

  const deletePlayer = (id: number) => {
    void dispatch(removePlayer(id)).then(() => {
      void dispatch(fetchPlayers({ Page: currentPage, PageSize: pageSize }));
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
          <InputSearch value={searchInputValue} onChangeInput={onChangeInputHandle} />
          <SelectComponent<'multi_select'>
            name="multi_select"
            isMulti={true}
            options={teamsOptions}
            value={playersParams?.multiSelectVal}
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
