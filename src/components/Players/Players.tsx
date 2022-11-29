import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchPlayers, removePlayer } from '../../redux/slices/playersSlice';
import { AddBtn } from '../AddBtn/AddBtn';
import { InputSearch } from '../InputSearch/InputSearch';

export const Players = () => {
  const dispatch = useAppDispatch();
  const players = useAppSelector((state) => state.players.playersData.data);
  const teams = useAppSelector(({ teams }) => teams.data);
  const navigate = useNavigate();

  // const teamNameByPlayerId = teams?.find((team) => players?.find((player) => team.id === player.team))
  // console.log(teamNameByPlayerId?.name);
  
  const teamNameByPlayerId = teams
    ?.filter((team) => players?.find((player) => team.id === player.team)).map(arr => arr.name)
  console.log(teamNameByPlayerId);
  
  
  // const findTeamNameByPlayerId = () => {
  //   if (players) {
  //     for (let i = 0; i <= players.length; i++) {
  //       players.forEach((player) => {
  //         const teamNameByPlayerId = teams.find((team) => team.id === player.team);
  //         return teamNameByPlayerId?.name;
  //       });
  //     }
  //   }
  // }

  const onFecthPlayers = async () => {
    const resp = await dispatch(fetchPlayers());
    if (!resp?.data.data.length) return navigate('/PlayersEmpty');
  };

  useEffect(() => {
    void onFecthPlayers();
  }, []);

  useEffect(() => {
    if (players && !players.length) {
      return navigate('/PlayersEmpty');
    }
  }, [players]);

  const onRedirectCreatePlayer = () => {
    return navigate('/PlayersCreate');
  };

  const deletePlayer = (id: number) => {
    void dispatch(removePlayer(id))
  }

  return (
    <div className="common__container">
      <div className="common__header">
        <InputSearch />
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
            <div className="common__player    ">
              <p>
                {player.name} <span>#{player.number}</span>{' '}
              </p>
              <span>{teamNameByPlayerId[index] }</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
