import { InfoHeader } from '../../InfoHeader/InfoHeader';
import { ReactComponent as EditSVG } from '../../../assets/icons/editSvg.svg';
import { ReactComponent as DeleteSVG } from '../../../assets/icons/deleteSvg.svg';
import { useEffect, useState } from 'react';
import { getTeam } from '../../../redux/slices/teamsSlice';
import { useAppDispatch } from './../../../redux/hooks';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { ITeamData } from '../../../types/teams/teams';
import { fetchPlayers } from './../../../redux/slices/playersSlice';
import { IPlayerData } from '../../../types/players/players';
import { DetailsCard } from '../../DetailsCard/DetailsCard';
import { DetailsTable } from '../../DetailsTable/DetailsTable';

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

        <DetailsCard {...teamData} />

        {playersInTeam?.length ? <DetailsTable playersInTeam={playersInTeam} /> : null}
      </div>
    </div>
  );
};
