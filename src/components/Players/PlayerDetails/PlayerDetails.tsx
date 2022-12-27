import { useEffect, useState } from "react";
import { useAppDispatch } from './../../../redux/hooks';
import qs from 'qs';
import { useLocation } from "react-router-dom";
import { getPlayer } from "../../../redux/slices/playersSlice";
import {IPlayerData} from '../../../types/players/players'
import { DetailsCard } from "../../DetailsCard/DetailsCard";
import { IGetPlayerResponse } from "../../../types/players/getPlayerResponse";



export const PlayerDetails = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  const [playerData, setPlayerData] = useState({} as IGetPlayerResponse);

  const { id } = qs.parse(location.search.substring(1));

  useEffect(() => {
    if (id) {
      void dispatch(getPlayer(Number(id))).then((resp) => {
        if(resp) {
          setPlayerData(resp?.data);
        }
      });
    }
  }, []);

  const playerBirthYear = new Date(playerData.birthday).getFullYear();
  const yearNow = new Date().getFullYear();
  const playerAge = yearNow - playerBirthYear;


  return (
    <div>
      {/* <DetailsCard {...playerData} /> */}
      <DetailsCard
        cardData={{
          position: playerData.position,
          teamName: playerData.teamName, 
          height: playerData.height,
          weight: playerData.weight,
          age: playerAge,
          number: playerData.number,
        }}
        name={playerData.name}
        image={playerData.avatarUrl}
      />
    </div>
  );
}
