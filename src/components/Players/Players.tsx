import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchPlayers, removePlayer } from '../../redux/slices/playersSlice';
import { AddBtn } from '../AddBtn/AddBtn';
import { ISelectOption, SelectComponent } from '../FormComponents/SelectComponent';
import { InputSearch } from '../InputSearch/InputSearch';
import { fetchTeams } from './../../redux/slices/teamsSlice';
import { Card } from '../Card/Card';
import  debounce  from 'lodash.debounce';
import { createBrowserHistory } from 'history';
import qs from 'qs';
import { Pagination } from '../pagination/Pagination';


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

  // URL
  useEffect(() => {
    void dispatch(fetchTeams()).then(() => {
      if (history.location.search) {
        const urlString = history.location.search.substring(1);
        const { Page, PageSize, Name } = qs.parse(urlString);

        const page = Number(Page);
        const pageSize = Number(PageSize);
        if (Page && PageSize) {
          if (Name) {
            void dispatch(
              fetchPlayers({
                Page: page,
                PageSize: pageSize,
                Name: String(Name),
              })
            );
            setName(String(Name));
            return;
          }
          void dispatch(
            fetchPlayers({
              Page: page,
              PageSize: pageSize,
            })
          );
        }
      } else {
        // used when switching back from a different page
        void dispatch(fetchPlayers({ Page, PageSize, Name }));
      }
    });
  }, []);

  useEffect(() => {
    const search = Name ? `&Name=${Name}` : '';

    navigate(`?Page=${Page}&PageSize=${PageSize}${search}`);
  }, [Page, PageSize, Name, players]);
  // --------------------

  // SEARCH INPUT
  const onChangeInput = useCallback(
    debounce(
      async (Name: string) => await dispatch(fetchPlayers({ Page: 1, PageSize, Name })),
      700
    ),
    []
  );

  const onChangeInputHandle = (Name: string) => {
    setName(Name);
    void onChangeInput(Name);
  };
  // --------------------------------------------------

  // PAGINATION
  const pagesAmount = Math.ceil(playersCount / PageSize);

  const onPageChange = (Page: number) => {
    void dispatch(fetchPlayers({ Page, PageSize, Name }));
  };
  // -------------------------------------------------

  // PAGINATION SELECT
  const paginationSelectOptions = [
    { value: 6, label: 6, isDisabled: PageSize === 6 },
    { value: 12, label: 12, isDisabled: PageSize === 12 },
    { value: 24, label: 24, isDisabled: PageSize === 24 },
  ];

  const onPaginationSelectChange = (pageSize: string | ISelectOption[]) => {
    void dispatch(fetchPlayers({ Page: 1, PageSize: Number(pageSize), Name }));
  };
  // ----------------------------

  // MULTI SELECT
  const onChangeMultiSelect = (option: string | ISelectOption[]) => {
    let TeamIds = '';

    // @ts-expect-error
    option?.forEach((o: ISelectOption) => {
      teams?.forEach(team => {
        if(o.value === team.name) {
          TeamIds.in
        }
      })
    })
    console.log(TeamIds);
    
    // void dispatch(fetchPlayers({Page, PageSize, Name, TeamIds}))
    // for (let i = 0; i < teams.length; i++) {
    //   // @ts-expect-error
    //   if (option[i]?.value === teams[i].name) {
    //     teamId = teams[i].id;
    //   }
    // }
    
  };
  // -------------------------
// нужно найти игроков у которых поле team(number) === team.id потом взять название этой команды и 
// если оно === option то забить в конечный результат


// team.id = option.value === team.name => player.team === team.id
  const onRedirectCreatePlayer = () => {
    return navigate('/PlayersCreate');
  };

  const deletePlayer = (id: number) => {
    void dispatch(removePlayer(id)).then(() => {
      void dispatch(fetchPlayers({ Page, PageSize, Name }));
    });
  };

  const teamsOptions = teams?.map((t) => ({ value: t.name, label: t.name }));

  // GET BACK AND FIX SELECT ONchNAGE(OPTION) TYPE!!!)

  return (
    <div className="common__container">
      <div className="common__header">
        <div className="common__header__group">
          <InputSearch value={Name} onChangeInput={onChangeInputHandle} />
          <SelectComponent<'multi_select'>
            name="multi_select"
            isMulti={true}
            options={teamsOptions}
            onChange={onChangeMultiSelect}
          />
        </div>
        <AddBtn onClick={onRedirectCreatePlayer} />
      </div>
      <div className="common__filled_content">
        {players?.map((player, index) => {
          let teamName = '';

          for (let i = 0; i < teams.length; i++) {
            if (teams[i].id === player.team) {
              teamName = teams[i].name;
            }
          }
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

  // const teamNameObj = teams?.reduce((acc, team) => {
  //   // @ts-expect-error
  //   acc[team.id] = {
  //     name: team.name,
  //     id: team.id,
  //   };
  //   return acc;
  // }, {});
