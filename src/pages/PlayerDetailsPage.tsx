import { useAppDispatch } from './../redux/hooks';
import qs from 'qs';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPlayer, removePlayer } from '../redux/slices/playersSlice';
import { DetailsCard } from '../components/DetailsCard/DetailsCard';
import { IGetPlayerResponse } from '../types/players/getPlayerResponse';
import { InfoHeader } from '../components/InfoHeader/InfoHeader';
import { RespStatusEnum } from '../types/enum';
import { useStateData } from '../hooks';


export const PlayerDetailsPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { id } = qs.parse(location.search.substring(1)) as {id: string};

  const playerData: IGetPlayerResponse = useStateData(getPlayer, id);
  
  const onEditPlayerHandle = () => {
    if (id) {
      navigate(`/PlayersCreate?id=${Number(id)}`);
    }
  };
  
  const onDeletePlayerHandle = () => {
    void dispatch(removePlayer(Number(id))).then((resp) => {
      if (resp && resp.status === RespStatusEnum.SUCCESS) {
        navigate('/Players');
      }
    });
  };
  
  const playerBirthYear = new Date(playerData?.birthday).getFullYear();
  const yearNow = new Date().getFullYear();
  const playerAge = yearNow - playerBirthYear;

  const getBackLink = 'Players';

  return (
    <div className="common__container">
      <div className="common__details">
        <div className="common__header">
          <InfoHeader
            getBackLink={getBackLink}
            name={playerData?.name}
            SVGs={true}
            onEdit={onEditPlayerHandle}
            onDelete={onDeletePlayerHandle}
          />
        </div>

        <DetailsCard
          cardData={{
            name: playerData?.name,
            image: playerData?.avatarUrl,
            position: playerData?.position,
            teamName: playerData?.teamName,
            height: playerData?.height,
            weight: playerData?.weight,
            age: playerAge,
            number: playerData?.number,
          }}
        />
      </div>
    </div>
  );
};
