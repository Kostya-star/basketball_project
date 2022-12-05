import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchPlayers, removePlayer } from '../../redux/slices/playersSlice';
import { IPlayerData } from '../../types/players/players';
import { AddBtn } from '../AddBtn/AddBtn';
import { SelectComponent } from '../FormComponents/SelectComponent';
import { InputSearch } from '../InputSearch/InputSearch';
import { fetchTeams } from './../../redux/slices/teamsSlice';

export const Players = () => {
  const dispatch = useAppDispatch();
  const players = useAppSelector((state) => state.players.playersData.data);
  const teams = useAppSelector(({ teams }) => teams.data);
  const navigate = useNavigate();

  const obj = teams?.reduce((acc, team) => {
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
    void onFecthPlayers();
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
          <InputSearch />
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
          <div
            onClick={() => deletePlayer(player.id)}
            className="common__filled_content__block"
            key={index}
          >
            <img src={`http://dev.trainee.dex-it.ru${player.avatarUrl}`} alt="team" />
            <div className="common__player">
              <p>
                {player.name} <span>#{player.number}</span>
              </p>
              {/* @ts-expect-error */}
              <span>{obj[player.team].name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
