import { InfoHeader } from '../../InfoHeader/InfoHeader';
import { ReactComponent as EditSVG } from '../../../assets/icons/editSvg.svg';
import { ReactComponent as DeleteSVG } from '../../../assets/icons/deleteSvg.svg';
import teamIMG from '../../../assets/img/PlayersEmpty/players__empty.png';
import { useEffect, useState } from 'react';
import { getTeam } from '../../../redux/slices/teamsSlice';
import { useAppDispatch, useAppSelector } from './../../../redux/hooks';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { ITeamData } from '../../../types/teams/teams';
import { baseRequestUrl } from '../../../api/baseRequest';
import { fetchPlayers } from './../../../redux/slices/playersSlice';
import { IPlayerData } from '../../../types/players/players';

export const TeamDetails = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [teamData, setTeamData] = useState({} as ITeamData);
  const [playersInTeam, setPlayersInTeam] = useState([] as IPlayerData[]);

  useEffect(() => {
    const { id } = qs.parse(location.search.substring(1));
    if (id) {
      void dispatch(getTeam(Number(id))).then((resp) => {
        setTeamData(resp.data);

        void dispatch(fetchPlayers()).then((resp) => {
          const sortedPlayers = resp?.data.data.filter((player) => player.team === Number(id));
          if (sortedPlayers) {
            setPlayersInTeam(sortedPlayers);
          }
        });
      });
    }
  }, []);

  return (
    <div className="common__container">
      <div className="common__details">
        <div className="common__header">
          <InfoHeader text={`Teams / ${teamData?.name}`} />
          <EditSVG />
          &nbsp; &nbsp;
          <DeleteSVG />
          &nbsp; &nbsp; &nbsp; &nbsp;
        </div>

        <div className="common__details__card">
          <div>
            <img src={`${baseRequestUrl}${teamData?.imageUrl}`} alt="teamimg" />
          </div>
          <div>
            <h1>{teamData?.name}</h1>
            <div className="common__details__card__description">
              <div>
                <h3>Year of foundation</h3>
                <span>{teamData?.foundationYear}</span>
              </div>
              <div>
                <h3>Division</h3>
                <span>{teamData?.division}</span>
              </div>
              <div>
                <h3>Conference</h3>
                <span>{teamData?.conference}</span>
              </div>
            </div>
          </div>
        </div>

        {playersInTeam?.length ? (
          <div className="common__details__table">
            <table>
              <thead>
                <tr>
                  <td style={{ fontSize: '18px' }}>Roster</td>
                </tr>
                <tr>
                  <td width="5%">#</td>
                  <td width="60%">Player</td>
                  <td>Height</td>
                  <td>Weight</td>
                  <td>Age</td>
                </tr>
              </thead>

              {playersInTeam.map((player) => {
                const playerBirthYear = new Date(player.birthday).getFullYear();
                const yearNow = new Date().getFullYear();
                const playerAge = yearNow - playerBirthYear;

                return (
                  <tbody key={player.id}>
                    <tr>
                      <td>{player.number}</td>
                      <td>
                        <div className="common__details__table__playerBlock">
                          <div>
                            <img src={`${baseRequestUrl}${player.avatarUrl}`} alt="" />
                          </div>
                          <div>
                            <div>{player.name}</div>
                            <div>
                              <span>{player.position}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{player.height} cm</td>
                      <td>{player.weight} kg</td>
                      <td>{playerAge}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
};
