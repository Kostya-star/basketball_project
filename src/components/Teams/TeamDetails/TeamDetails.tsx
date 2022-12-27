import { InfoHeader } from '../../InfoHeader/InfoHeader';
import { useEffect, useState } from 'react';
import { useAppDispatch } from './../../../redux/hooks';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';
import { ITeamData } from '../../../types/teams/teams';
import { fetchPlayers } from './../../../redux/slices/playersSlice';
import { IPlayerData } from '../../../types/players/players';
import { DetailsCard } from '../../DetailsCard/DetailsCard';
import { DetailsTable } from '../../DetailsTable/DetailsTable';
import { getTeam, removeTeam } from './../../../redux/slices/teamsSlice';
import { RespStatusEnum } from '../../../types/enum';
import { RespError } from '../../RespError';

export const TeamDetails = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [teamData, setTeamData] = useState({} as ITeamData);
  const [playersInTeam, setPlayersInTeam] = useState([] as IPlayerData[]);

  const [serverResponse, setServerResponse] = useState('');

  const { id } = qs.parse(location.search.substring(1));

  useEffect(() => {
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

  const onEditTeamHandle = () => {
    if (id) {
      navigate(`/TeamCreate?id=${Number(id)}`);
    }
  };

  const onDeleteTeamHandle = () => {
    void dispatch(removeTeam(Number(id)))
      .catch((e) => {
        if (e.response.status === RespStatusEnum.SERVERERROR) {
          setServerResponse("Can't delete a team that contains players");
        }
      })
      .then((resp) => {
        if (resp && resp.status === RespStatusEnum.SUCCESS) {
          navigate('/Teams');
        }
      });
  };

  const getBackLink = 'Teams'

  const teamDetailsArr = Object.keys(teamData).filter(
    (key) => key.includes('foundationYear') && key.includes('division')
  );

  return (
    <div className="common__container">
      <div className="common__details">
        <div className="common__header">
          <InfoHeader
            getBackLink={getBackLink}
            name={teamData?.name}
            SVGs={true}
            onEditTeamHandle={onEditTeamHandle}
            onDeleteTeamHandle={onDeleteTeamHandle}
          />
        </div>

        {/* <DetailsCard {...teamData} /> */}
        <DetailsCard
          cardData={{
            foundationYear: teamData.foundationYear,
            division: teamData.division,
            conference: teamData.conference,
          }}
          name={teamData.name}
          image={teamData.imageUrl}
        />

        {serverResponse && <RespError response={serverResponse} setResponse={setServerResponse} />}

        {playersInTeam?.length ? <DetailsTable playersInTeam={playersInTeam} /> : null}
      </div>
    </div>
  );
};
