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
import { Pagination } from '../pagination/Pagination';
import { IPlayerData } from '../../types/players/players';
import players__empty from '../../assets/img/PlayersEmpty/players__empty.png';
import { Empty } from '../Empty/Empty';
import { Navigation } from '../Navigation/Navigation';
import { ISelectOption } from '../../types/ISelectOption';

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
      if (history.location.search) {
        const urlString = history.location.search.substring(1);
        const urlParams = qs.parse(urlString);
        const { Page, PageSize, Name, TeamIds } = urlParams;

        
        let convertIdToString = ``;
        
        if (Array.isArray(TeamIds)) {
          TeamIds?.forEach((teamId) => {
            convertIdToString = convertIdToString.concat(`&TeamIds=${Number(teamId)}`);
          });
        } else {
          convertIdToString = convertIdToString.concat(`&TeamIds=${Number(TeamIds)}`);
        }
        
        const page = Number(Page) && Number(Page);
        const pageSize = Number(PageSize) && Number(PageSize);
        const name = Name && String(Name)
        const teamIds = TeamIds && convertIdToString

        void dispatch(
          fetchPlayers({
            Page: page,
            PageSize: pageSize,
            Name: name,
            TeamIds: teamIds,
          })
        );
        if (Name) {
          setName(String(Name));
        }
        if (TeamIds) {
          setMultiSelect(convertIdToString);
        }
      } else {
        if (PageSize === 25) {
          void dispatch(fetchPlayers({ Page, PageSize: 6 }));
          return;
        }
        // used when switching back from a different page
        void dispatch(fetchPlayers({ Page, PageSize }));
      }
    });
  }, []);

  // MOUNTING DATA INTO URL
  useEffect(() => {
    const search = Name ? `&Name=${Name}` : '';

    navigate(`?Page=${Page}&PageSize=${PageSize}${search}${multiSelect}`);
  }, [Page, PageSize, Name, multiSelect, players]);

  // SEARCH INPUT
  const onChangeInputHandle = (Name: string) => {
    setName(Name);
    void onChangeInput(Name);
  };

  const onChangeInput = useCallback(
    debounce(
      async (Name: string) =>
        await dispatch(fetchPlayers({ Page: 1, PageSize, Name, TeamIds: multiSelect })),
      700
    ),
    [Page, PageSize, Name, multiSelect]
  );

  // PAGINATION
  const onPageChange = (Page: number) => {
    void dispatch(fetchPlayers({ Page, PageSize, Name, TeamIds: multiSelect }));
  };

  // PAGINATION SELECT
  const onPaginationSelectChange = (pageSize: string | ISelectOption[]) => {
    void dispatch(
      fetchPlayers({ Page: 1, PageSize: Number(pageSize), Name, TeamIds: multiSelect })
    );
  };

  // MULTI SELECT
  const onChangeMultiSelect = (options: string | ISelectOption[]) => {
    let TeamIds = ``;

    if (Array.isArray(options)) {
      options?.forEach((o) => {
        TeamIds = TeamIds.concat(`&TeamIds=${o.id}`);
      });
    }

    setMultiSelect(TeamIds);
    void dispatch(fetchPlayers({ Page: 1, PageSize, Name, TeamIds }));
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
