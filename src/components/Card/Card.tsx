import { FC } from 'react';
import { baseRequestUrl } from '../../api/baseRequest';
import s from './Card.module.scss';

interface ICardProps {
  id: number;
  image?: string;
  name: string;
  number?: number;
  foundationYear?: number;
  team?: number;
  deleteCard: (id: number) => void;
  teamName?: string;
}

export const Card: FC<ICardProps> = ({
  id,
  name,
  image,
  number,
  foundationYear,
  team,
  teamName,
  deleteCard,
}) => {
  return (
    <div onClick={() => deleteCard(id)} className={s.card}>
      <img src={`${baseRequestUrl}${image}`} alt="teamPlayerCard" />
      <div>
        <p>
          <>
            {name} {number && <span>#{number}</span>}
          </>
        </p>
        {foundationYear ? (
          <span>Year of foundation: {foundationYear}</span>
        ) : (
          team && <span>{teamName}</span>
        )}
      </div>
    </div>
  );
};
