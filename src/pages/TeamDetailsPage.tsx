import { InfoHeader } from '../components/InfoHeader/InfoHeader';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';
import { ITeamData } from '../types/teams/teams';
import { fetchPlayers } from '../redux/slices/playersSlice';
import { IPlayerData } from '../types/players/players';
import { DetailsCard } from '../components/DetailsCard/DetailsCard';
import { DetailsTable } from '../components/DetailsTable/DetailsTable';
import { getTeam, removeTeam } from '../redux/slices/teamsSlice';
import { RespStatusEnum } from '../types/enum';
import { RespError } from '../components/RespError';
import { useStateData } from '../hooks';


export const TeamDetailsPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [serverResponse, setServerResponse] = useState('');

  const { id } = qs.parse(location.search.substring(1)) as {id: string};

  const teamData: ITeamData = useStateData(getTeam, id);
  const players = useStateData(fetchPlayers);
  const playersInTable = players?.data.filter((player: IPlayerData) => player.team === Number(id));

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


  return (
    <div className="common__container">
      <div className="common__details">
        <div className="common__header">
          <InfoHeader
            getBackLink={getBackLink}
            name={teamData?.name}
            SVGs={true}
            onEdit={onEditTeamHandle}
            onDelete={onDeleteTeamHandle}
          />
        </div>

        <DetailsCard
          cardData={{
            name: teamData?.name,
            image: teamData?.imageUrl,
            foundationYear: teamData?.foundationYear,
            division: teamData?.division,
            conference: teamData?.conference,
          }}
        />

        {serverResponse && <RespError response={serverResponse} setResponse={setServerResponse} />}

        {playersInTable?.length ? <DetailsTable playersInTable={playersInTable} /> : null}
      </div>
    </div>
  );
};
