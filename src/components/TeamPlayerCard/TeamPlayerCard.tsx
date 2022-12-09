import { FC } from 'react';
import { ITeamPlayerData } from '../../types/ITeamPlayerData';
import s from './TeamPlayerCard.module.scss';

interface TeamPlayerCardProps {
  item: ITeamPlayerData;
  deleteItem: (id: number) => void;
  teamNameObj?: {};
}

export const TeamPlayerCard: FC<TeamPlayerCardProps> = ({ item, teamNameObj, deleteItem }) => {
  const baseCardImageUrl = 'http://dev.trainee.dex-it.ru';
  return (
    <div onClick={() => deleteItem(item.id)} className={s.item__card}>
      <img
        src={`${baseCardImageUrl}${item.imageUrl ? item.imageUrl : item.avatarUrl}`}
        alt="teamPlayerCard"
      />
      <div>
        <p>
          {item.name} {item.number && <span>#{item.number}</span>}
        </p>
        {item.foundationYear ? (
          <span>Year of foundation: {item.foundationYear}</span>
        ) : (
          // @ts-expect-error
          item.team && <span>{teamNameObj[item.team]?.name}</span>
        )}
      </div>
    </div>
  );
};
