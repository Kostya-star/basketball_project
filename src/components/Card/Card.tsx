import { FC } from 'react';
import { baseRequestUrl } from '../../api/baseRequest';
import s from './Card.module.scss';

interface ICardProps {
  id: number;
  imageUrl?: string;
  avatarUrl?: string;
  name: string;
  number?: number;
  foundationYear?: number;
  team?: number;
  deleteCard: (id: number) => void;
  obj?: {};
}

export const Card: FC<ICardProps> = ({
  id,
  name,
  imageUrl,
  avatarUrl,
  number,
  foundationYear,
  team,
  obj,
  deleteCard,
}) => {
  return (
    <div onClick={() => deleteCard(id)} className={s.card}>
      <img src={`${baseRequestUrl}${imageUrl ?? avatarUrl}`} alt="teamPlayerCard" />
      <div>
        <p>
          <>
            {name} {number && <span>#{number}</span>}
          </>
        </p>
        {foundationYear ? (
          <span>Year of foundation: {foundationYear}</span>
        ) : (
          // @ts-expect-error
          team && <span>{obj[team]?.name}</span>
        )}
      </div>
    </div>
  );
};
