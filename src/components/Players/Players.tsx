import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchPlayers, removePlayer } from '../../redux/slices/playersSlice';
import { IPlayerData } from '../../types/players/players';
import { AddBtn } from '../AddBtn/AddBtn';
import { SelectComponent } from '../FormComponents/SelectComponent';
import { InputSearch } from '../InputSearch/InputSearch';
import { fetchTeams } from './../../redux/slices/teamsSlice';
import { TeamPlayerCard } from './../TeamPlayerCard/TeamPlayerCard';

export const Players = () => {
  const dispatch = useAppDispatch();
  const players = useAppSelector(({ players }) => players.playersData.data);
  const teams = useAppSelector(({ teams }) => teams.data);
  const navigate = useNavigate();

  const teamNameObj = teams?.reduce((acc, team) => {
    // @ts-expect-error
    acc[team.id] = {
      name: team.name,
      id: team.id,
    };
    return acc;
  }, {});

  const onFecthPlayers = async () => {
    const resp = await dispatch(fetchPlayers());
    if (!resp?.data.data.length) return navigate('/PlayersEmpty');
  };

  useEffect(() => {
    void dispatch(fetchTeams()).then(() => {
      void onFecthPlayers();
    });
  }, []);

  useEffect(() => {
    if (players && !players.length) {
      void onFecthPlayers();
    }
  }, [players]);

  const onRedirectCreatePlayer = () => {
    return navigate('/PlayersCreate');
  };

  const deletePlayer = (id: number) => {
    void dispatch(removePlayer(id));
  };

  const teamsOptions = teams?.map((t) => ({ value: t.name, label: t.name }));

  return (
    <div className="common__container">
      <div className="common__header">
        <div className="common__header__group">
          {/* <InputSearch /> */}
          <SelectComponent<'multi_select'>
            name="multi_select"
            isMulti={true}
            options={teamsOptions}
          />
        </div>
        <AddBtn onClick={onRedirectCreatePlayer} />
      </div>
      <div className="common__filled_content">
        {players?.map((player, index) => (
          <TeamPlayerCard
            item={player}
            deleteItem={deletePlayer}
            teamNameObj={teamNameObj}
            key={`${player.id}__${index}`}
          />
        ))}
      </div>
    </div>
  );
};
