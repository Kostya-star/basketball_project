import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchPlayers, removePlayer } from '../../redux/slices/playersSlice';
import { AddBtn } from '../AddBtn/AddBtn';
import { ISelectOption, SelectComponent } from '../FormComponents/SelectComponent';
import { InputSearch } from '../InputSearch/InputSearch';
import { fetchTeams } from './../../redux/slices/teamsSlice';
import { Card } from '../Card/Card';
import debounce from 'lodash.debounce';
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

  const [currentPage, setCurrentPage] = useState(Page);
  const [cardsPerPage, setCardsPerPage] = useState(PageSize);
  const [Name, setName] = useState('');
  const [multiSelectValue, setMultiSelectValue] = useState('');

  const isMounting = useRef(false)

  // URL
  useEffect(() => {
    isMounting.current = true
    void dispatch(fetchTeams()).then(() => {
      if (history.location.search) {
        const urlString = history.location.search.substring(1);
        const urlParams = qs.parse(urlString);
        const { Page, PageSize, Name, TeamIds } = urlParams;

        const page = Number(Page);
        const pageSize = Number(PageSize);

        let convertIdToString = ``;

        if (Array.isArray(TeamIds)) {
          TeamIds?.forEach((teamId) => {
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            convertIdToString = convertIdToString.concat(`&TeamIds=${teamId}`);
          });
        } else {
          convertIdToString = convertIdToString.concat(`&TeamIds=${TeamIds}`);
        }

        // console.log(urlParams);
        if (page && pageSize) {
          // if (Name) {
          void dispatch(
            fetchPlayers({
              Page: page,
              PageSize: pageSize,
              Name: Name && String(Name),
              TeamIds: TeamIds && convertIdToString,
            })
          );
          if (Name) {
            setName(String(Name));
          }
          if (TeamIds) {
            setMultiSelectValue(convertIdToString);
          }
        }
      } else {
        if (PageSize === 25) {
          void dispatch(fetchPlayers({ Page, PageSize: 6, Name }));
          return;
        }
        // used when switching back from a different page
        void dispatch(fetchPlayers({ Page, PageSize, Name }));
      }
    });
  }, []);

  useEffect(() => {
    if(!isMounting.current) {
      console.log(
        `currentPage ${currentPage};  
        cardsPerPage ${cardsPerPage}; 
        Name ${Name};  
        multiSelectValue ${multiSelectValue} `
      );

      if(Name) {
        void onChangeInput()
        return;
      }
  
      void dispatch(
        fetchPlayers({
          Page: currentPage && currentPage,
          PageSize: cardsPerPage && cardsPerPage,
          // Name: Name && String(Name),
          TeamIds: multiSelectValue && multiSelectValue,
        })
      );
    }

    isMounting.current = false

  }, [currentPage, cardsPerPage, Name, multiSelectValue]);

  useEffect(() => {
    const search = Name ? `&Name=${Name}` : '';

    navigate(`?Page=${currentPage}&PageSize=${cardsPerPage}${search}${multiSelectValue}`);
  }, [currentPage, cardsPerPage, Name, multiSelectValue, players]);

  // SEARCH INPUT
  const onChangeInput = useCallback(
    debounce(
      async () => await dispatch(fetchPlayers({ Page: 1, PageSize: cardsPerPage, Name, TeamIds: multiSelectValue })),
      700
    ),
    []
  );

  const onChangeInputHandle = (Name: string) => {
    setName(Name);
  };
  // --------------------------------------------------

  // PAGINATION
  const pagesAmount = Math.ceil(playersCount / PageSize);
  const onPageChange = (Page: number) => {
    setCurrentPage(Page);
  };
  // -------------------------------------------------

  // PAGINATION SELECT
  const paginationSelectOptions = [
    { value: 6, label: 6, isDisabled: PageSize === 6 },
    { value: 12, label: 12, isDisabled: PageSize === 12 },
    { value: 24, label: 24, isDisabled: PageSize === 24 },
  ];

  const onPaginationSelectChange = (pageSize: string | ISelectOption[]) => {
    setCardsPerPage(Number(pageSize));
    setCurrentPage(1);
  };
  // ----------------------------

  // MULTI SELECT
  const teamsOptions = teams?.map((t) => ({ value: t.name, label: t.name, id: t.id }));

  const replaceString = multiSelectValue.replace(/&TeamIds=/g, ',').substring(1);
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

  const onChangeMultiSelect = (options: string | ISelectOption[]) => {
    let TeamIds = ``;
    if (Array.isArray(options)) {
      options?.forEach((o) => {
        TeamIds = TeamIds.concat(`&TeamIds=${o.id}`);
      });
    }

    setMultiSelectValue(TeamIds);
    setCurrentPage(1);
  };
  // -------------------------

  const onRedirectCreatePlayer = () => {
    return navigate('/PlayersCreate');
  };

  const deletePlayer = (id: number) => {
    void dispatch(removePlayer(id)).then(() => {
      void dispatch(fetchPlayers({ Page, PageSize, Name }));
    });
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
