import { FC } from 'react';
import { baseRequestUrl } from '../../api/baseRequest';
import { ICardData } from '../../types/ITeamPlayerData';
import s from './Card.module.scss';

interface ICardProps {
  item: ICardData;
  deleteItem: (id: number) => void;
  obj?: {};
}

export const Card: FC<ICardProps> = ({ item, obj, deleteItem }) => {
  return (
    <div onClick={() => deleteItem(item.id)} className={s.card}>
      <img
        src={`${baseRequestUrl}${item.imageUrl ? item.imageUrl : item.avatarUrl}`}
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
          item.team && <span>{obj[item.team]?.name}</span>
        )}
      </div>
    </div>
  );
};
