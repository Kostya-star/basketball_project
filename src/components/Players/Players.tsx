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
// import { ITeamsPlayersParams } from '../../types/IBaseParamsGetRequest';

// export const Players = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const history = createBrowserHistory();

//   const { players, teams, Page, PageSize, playersCount } = useAppSelector(({ players, teams }) => ({
//     players: players.playersData.data,
//     Page: players.playersData.page,
//     PageSize: players.playersData.size,
//     playersCount: players.playersData.count,
//     teams: teams.data,
//   }));

//   const [Name, setName] = useState('');
//   const [multiSelect, setMultiSelect] = useState('');

//   // PERSISTING URL
//   useEffect(() => {
//     void dispatch(fetchTeams()).then(() => {
//       const urlString = history.location.search.substring(1);
//       const { page, pageSize, name, TeamIds } = qs.parse(urlString);

//       let convertIdToString = ``;

//       if (Array.isArray(TeamIds)) {
//         TeamIds?.forEach((teamId) => {
//           convertIdToString = convertIdToString.concat(`&TeamIds=${Number(teamId)}`);
//         });
//       } else {
//         convertIdToString = convertIdToString.concat(`&TeamIds=${Number(TeamIds)}`);
//       }

//       const PAGE = page ? Number(page) : Number(Page);
//       const PAGE_SIZE = pageSize
//         ? Number(pageSize)
//         : Number(PageSize) !== 25
//         ? Number(PageSize)
//         : 6;
//       const SEARCH_VALUE = name ? String(name) : '';
//       const TEAM_IDS = TeamIds ? String(convertIdToString) : '';

//       void dispatch(
//         fetchPlayers({
//           Page: PAGE,
//           PageSize: PAGE_SIZE,
//           Name: SEARCH_VALUE,
//           TeamIds: TEAM_IDS,
//         })
//       );
//       setName(SEARCH_VALUE);
//       setMultiSelect(TEAM_IDS);
//     });
//   }, []);

//   // MOUNTING DATA INTO URL
//   useEffect(() => {
//     const search = Name ? `&name=${Name}` : '';

//     navigate(`?page=${Page}&pageSize=${PageSize}${search}${multiSelect}`);
//   }, [Page, PageSize, Name, multiSelect, players]);

//   const onFetchPlayersHandler = (playersParams: ITeamsPlayersParams) => {
//     const { page, pageSize, search, multiSelectVal } = playersParams;
//     void dispatch(
//       fetchPlayers({
//         Page: page ?? Page,
//         PageSize: pageSize ?? PageSize,
//         Name: search ?? Name,
//         TeamIds: multiSelectVal ?? multiSelect,
//       })
//     );
//   };

//   // PAGINATION
//   const onPageChange = (page: number) => {
//     onFetchPlayersHandler({ page });
//   };

//   // PAGINATION SELECT
//   const onPaginationSelectChange = (pageSize: string | ISelectOption[]) => {
//     onFetchPlayersHandler({ page: 1, pageSize: Number(pageSize) });
//   };

//   // SEARCH INPUT
//   const onChangeInputHandle = (search: string) => {
//     setName(search);
//     void onChangeInput(search);
//   };

//   const onChangeInput = useCallback(
//     debounce(async (search: string) => onFetchPlayersHandler({ page: 1, search }), 700),
//     [Page, PageSize, multiSelect]
//   );

//   // MULTI SELECT
//   const onChangeMultiSelect = (options: string | ISelectOption[]) => {
//     let multiSelectVal = ``;
    

//     if (options && Array.isArray(options)) {
//       options?.forEach((o) => {
//         multiSelectVal = multiSelectVal.concat(`&TeamIds=${o.id}`);

//         // setMultiSelect([...multiSelect, o.id ]);
//       });
//     }
//     console.log(multiSelect);
    

//     setMultiSelect(multiSelectVal);
//     onFetchPlayersHandler({ page: 1, multiSelectVal });
//   };

//   const teamsOptions = teams?.map((t) => ({ value: t.name, label: t.name, id: t.id }));

//   // CREATING VALUE FOR MULTI SELECT
//   const replaceString = multiSelect.replace(/&TeamIds=/g, ',').substring(1);
//   const arrOfStrings = Array.from(replaceString.split(','));
//   const arrOfValues = arrOfStrings.map((str) => Number(str));

//   const multiSelectValues = teamsOptions.filter((teamOption) => {
//     let val;
//     arrOfValues.forEach((v) => {
//       if (teamOption.id === v) {
//         val = teamOption.id === v;
//       }
//     });
//     return val;
//   });
//   // ------------------------
//   // -------------------------

//   const onRedirectCreatePlayer = () => {
//     return navigate('/PlayersCreate');
//   };

//   const deletePlayer = (id: number) => {
//     void dispatch(removePlayer(id)).then(() => {
//       void dispatch(fetchPlayers({ Page, PageSize, Name }));
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
//           <InputSearch value={Name} onChangeInput={onChangeInputHandle} />
//           <SelectComponent<'multi_select'>
//             name="multi_select"
//             isMulti={true}
//             options={teamsOptions}
//             value={multiSelectValues}
//             onChange={onChangeMultiSelect}
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
//             currentPage={Page}
//             teamsPlayersCount={playersCount}
//             PageSize={PageSize}
//             onPageChange={onPageChange}
//             onPaginationSelectChange={onPaginationSelectChange}
//           />
//         </div>
//       ) : null}
//     </div>
//   );
// };











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
// import { ITeamsPlayersParams } from '../../types/IBaseParamsGetRequest';

// export const Players = () => {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const history = createBrowserHistory();

//   const { players, teams, Page, PageSize, playersCount } = useAppSelector(({ players, teams }) => ({
//     players: players.playersData.data,
//     Page: players.playersData.page,
//     PageSize: players.playersData.size,
//     playersCount: players.playersData.count,
//     teams: teams.data,
//   }));

//   // const [currentPage, setCurrentPage] = useState()
//   // const [pageSize_, setCurrentPage] = useState()
//   // const [playersParams, setPlayersParams] = useState({page: Page, pageSize: PageSize, search: '', multiSelectVal: []})
//   const [playersParams, setPlayersParams] = useState<ITeamsPlayersParams>({})
//   // const [Name, setName] = useState('');
//   // const [multiSelect, setMultiSelect] = useState<ISelectOption[]>([]);

//   const isMounting = useRef(false)

//   // const search = Name ? `&name=${Name}` : '';
//   // const multiSelectValue = multiSelect?.length
//   //   ? multiSelect
//   //       .map((o) => `TeamIds=${o.id}`)
//   //       .join('&')
//   //       .replace('', '&')
//   //   : '';

//   // PERSISTING URL
//   useEffect(() => {
//     isMounting.current = true
//     void dispatch(fetchTeams()).then(() => {
//       const urlString = history.location.search.substring(1);
//       const { page, pageSize, name, TeamIds } = qs.parse(urlString);

//       // let convertIdToString = ``;

//       // if (Array.isArray(TeamIds)) {
//       //   TeamIds?.forEach((teamId) => {
//       //     convertIdToString = convertIdToString.concat(`&TeamIds=${Number(teamId)}`);
//       //   });
//       // } else {
//       //   convertIdToString = convertIdToString.concat(`&TeamIds=${Number(TeamIds)}`);
//       // }

//       const PAGE = page ? Number(page) : Number(Page);
//       const PAGE_SIZE = pageSize
//         ? Number(pageSize)
//         : Number(PageSize) !== 25
//         ? Number(PageSize)
//         : 6;
//       const SEARCH_VALUE = name ? String(name) : '';
//       // const TEAM_IDS = TeamIds ? String(convertIdToString) : '';
//       const TEAM_IDS = TeamIds ? playersParams.multiSelectVal?.map((o) => `TeamIds=${o.id}`).join('&').replace('', '&') : '';
      

//       void dispatch(
//         fetchPlayers({
//           Page: PAGE,
//           PageSize: PAGE_SIZE,
//           Name: SEARCH_VALUE,
//           TeamIds: TEAM_IDS,
//         })
//       );
//       // setName(SEARCH_VALUE);
//       setPlayersParams(({
//         page: PAGE,
//         pageSize: PAGE_SIZE,
//         search: SEARCH_VALUE,
//         multiSelectVal: TEAM_IDS as unknown as ISelectOption[]
//       }))
  
//       // setMultiSelect(TEAM_IDS);
//     });
//   }, []);

//   // MOUNTING DATA INTO URL
//   // useEffect(() => {
//   //   navigate(`?page=${Page}&pageSize=${PageSize}${search}${multiSelectValue}`);
//   // }, [Page, PageSize, Name, multiSelect, players]);


//   useEffect(() => {
//     console.log('2 use effect');
    
//     const { page, pageSize, search, multiSelectVal } = playersParams;

//     const PAGE = page ? `?page=${page}` : Page ? `?page=${Page}` : 1;
//     const PAGE_SIZE = pageSize ? `&pageSize=${pageSize}` : PageSize ? `&pageSize=${PageSize}` : 6;
//     const SEARCH = search ? `&name=${search}` : '';
//     const TEAM_IDS = multiSelectVal?.length
//       ? multiSelectVal
//           .map((o) => `TeamIds=${o.id}`)
//           .join('&')
//           .replace('', '&')
//       : '';

//     if (!isMounting.current) {
//       void dispatch(
//         fetchPlayers({
//           Page: Number(PAGE),
//           PageSize: Number(PAGE_SIZE),
//           Name: SEARCH,
//           TeamIds: TEAM_IDS,
//         })
//       );
//     }

//     isMounting.current = false

//     navigate(`${PAGE}${PAGE_SIZE}${SEARCH}${TEAM_IDS}`);
//   }, [playersParams]);


//   // const onFetchPlayersHandler = (playersParams: ITeamsPlayersParams) => {
//   //   const { page, pageSize, search, multiSelectVal } = playersParams;
//   //   console.log(multiSelectValue);
    
//   //   void dispatch(
//   //     fetchPlayers({
//   //       Page: page ?? Page,
//   //       PageSize: pageSize ?? PageSize,
//   //       Name: search ?? Name,
//   //       TeamIds: multiSelectVal ? multiSelectValue : '',
//   //     })
//   //   );
//   // }

//   // PAGINATION
//   const onPageChange = (page: number) => {
//     // onFetchPlayersHandler({ page });
//     setPlayersParams((rest) => ({
//       ...rest,
//       page
//     }))
//   };

//   // PAGINATION SELECT
//   const onPaginationSelectChange = (pageSize: string | ISelectOption[]) => {
//     // onFetchPlayersHandler({ page: 1, pageSize: Number(pageSize) });
//     // setPlayersParams({page: 1, pageSize: Number(pageSize)})
//     setPlayersParams((rest) => ({
//       ...rest,
//       page: 1,
//       pageSize: Number(pageSize),
//     }))

//   };
  
//   // SEARCH INPUT
//   const onChangeInputHandle = (search: string) => {
//     // setName(search);
//     // setPlayersParams({page: 1, search})
//     setPlayersParams((rest) => ({
//       ...rest,
//       page: 1,
//       search: search,
//     }))

    
//     // void onChangeInput(search);
//   };

//   // const onChangeInput = useCallback(
//     // debounce(async (search: string) => onFetchPlayersHandler({ page: 1, search }), 700),
//     // [Page, PageSize, multiSelect]
//   // );

//   // MULTI SELECT
//   const onChangeMultiSelect = (multiSelectArr: string | ISelectOption[]) => {
    
//     // setMultiSelect(() => multiSelectArr as ISelectOption[]);
//     // setPlayersParams({page: 1, multiSelectVal: multiSelectArr as ISelectOption[]})
//     setPlayersParams((rest) => ({
//       ...rest,
//       page: 1,
//       multiSelectVal: multiSelectArr as ISelectOption[],
//     }))

//     // onFetchPlayersHandler({ page: 1, multiSelectVal: multiSelectArr as ISelectOption[] });
//   };

//   const teamsOptions = teams?.map((t) => ({ value: t.name, label: t.name, id: t.id }));

//   // CREATING VALUE FOR MULTI SELECT
//   // const replaceString = multiSelect.replace(/&TeamIds=/g, ',').substring(1);
//   // const arrOfStrings = Array.from(replaceString.split(','));
//   // const arrOfValues = arrOfStrings.map((str) => Number(str));

//   // const multiSelectValues = teamsOptions.filter((teamOption) => {
//   //   let val;
//   //   arrOfValues.forEach((v) => {
//   //     if (teamOption.id === v) {
//   //       val = teamOption.id === v;
//   //     }
//   //   });
//   //   return val;
//   // });
//   // ------------------------
//   // -------------------------

//   const onRedirectCreatePlayer = () => {
//     return navigate('/PlayersCreate');
//   };

//   const deletePlayer = (id: number) => {
//     void dispatch(removePlayer(id)).then(() => {
//       void dispatch(fetchPlayers({ Page, PageSize }));
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
//           <InputSearch onChangeInput={onChangeInputHandle} />
//           <SelectComponent<'multi_select'>
//             name="multi_select"
//             isMulti={true}
//             options={teamsOptions}
//             value={playersParams.multiSelectVal}
//             onChange={onChangeMultiSelect}
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
//             currentPage={Page}
//             teamsPlayersCount={playersCount}
//             PageSize={PageSize}
//             onPageChange={onPageChange}
//             onPaginationSelectChange={onPaginationSelectChange}
//           />
//         </div>
//       ) : null}
//     </div>
//   );
// };



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

  const { players, teams, currentPage, pageSize, playersCount } = useAppSelector(({ players, teams }) => ({
    players: players.playersData.data,
    currentPage: players.playersData.page,
    pageSize: players.playersData.size,
    playersCount: players.playersData.count,
    teams: teams.data,
  }));

  const [playersParams, setPlayersParams] = useState<ITeamsPlayersParams>({});

  const isMounting = useRef(false);

  const teamsOptions = teams?.map((t) => ({ value: t.name, label: t.name, id: t.id }));

  const TEAM_IDS_FOR_STATE = teamsOptions.filter((t) => t.id === 4044)

  // PERSISTING URL
  useEffect(() => {
    isMounting.current = true;

    void dispatch(fetchTeams()).then(() => {
      const urlString = history.location.search.substring(1);
      const { Page, PageSize, Name, TeamIds } = qs.parse(urlString);
      
      const PAGE = Page ? Number(Page) : Number(currentPage);
      const PAGE_SIZE = PageSize
        ? Number(PageSize)
        : Number(pageSize) !== 25
        ? Number(pageSize)
        : 6;
        const SEARCH_VALUE = Name ? String(Name) : '';
        const TEAM_IDS_FOR_REQUEST =
          TeamIds &&
          typeof TeamIds === 'object' &&
          // @ts-expect-error
          TeamIds.map((t) => `TeamIds=${Number(t)}`)
            .join('&')
            .replace('', '&');

        const TEAM_IDS_FOR_STATE =
          TeamIds &&
          typeof TeamIds === 'string' &&
          teamsOptions?.filter((t) => t.id === Number(TeamIds));
        
              void dispatch(
                fetchPlayers({
                  Page: PAGE,
                  PageSize: PAGE_SIZE,
                  Name: SEARCH_VALUE,
                  TeamIds: TEAM_IDS_FOR_REQUEST,
                })
              );
      setPlayersParams(({
        page: PAGE,
        itemsPerPage: PAGE_SIZE,
        search: SEARCH_VALUE,
        multiSelectVal: TEAM_IDS_FOR_STATE as ISelectOption[],
      }));
    });
  }, []);

  // MOUNTING DATA INTO URL

  useEffect(() => {
    const { page, itemsPerPage, search, multiSelectVal } = playersParams;

    const PAGE = page ?? currentPage ?? 1;
    const PAGE_SIZE = itemsPerPage ?? pageSize ?? 6;
    const SEARCH = search ? `&Name=${search}` : '';
    const TEAM_IDS = multiSelectVal?.length
      ? multiSelectVal
          .map((o) => `TeamIds=${o.id}`)
          .join('&')
          .replace('', '&')
      : '';

    if (!isMounting.current) {
      void dispatch(
        fetchPlayers({
          Page: PAGE,
          PageSize: PAGE_SIZE,
          Name: search,
          TeamIds: TEAM_IDS,
        })
      );
    }

    isMounting.current = false;

    navigate(`?Page=${PAGE}&PageSize=${PAGE_SIZE}${SEARCH}${TEAM_IDS}`);
  }, [playersParams]);

  // PAGINATION
  const onPageChange = (page: number) => {
    setPlayersParams((rest) => ({
      ...rest,
      page,
    }));
  };

  // PAGINATION SELECT
  const onPaginationSelectChange = (pageSize: string | ISelectOption[]) => {
    setPlayersParams((rest) => ({
      ...rest,
      page: 1,
      itemsPerPage: Number(pageSize),
    }));
  };

  // SEARCH INPUT
  const onChangeInputHandle = (search: string) => {
      setPlayersParams((rest) => ({
        ...rest,
        page: 1,
        search,
      }));

  //   // void onChangeInput(search);
  };

  // const onChangeInput = useCallback(
  // debounce(async (search: string) => onFetchPlayersHandler({ page: 1, search }), 700),
  // [Page, PageSize, multiSelect]
  // );

  // MULTI SELECT
  const onChangeMultiSelect = (multiSelectArr: string | ISelectOption[]) => {
    setPlayersParams((rest) => ({
      ...rest,
      page: 1,
      multiSelectVal: multiSelectArr as ISelectOption[],
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
          <InputSearch value={playersParams?.search} onChangeInput={onChangeInputHandle} />
          <SelectComponent<'multi_select'>
            name="multi_select"
            isMulti={true}
            options={teamsOptions}
            value={playersParams?.multiSelectVal}
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
