import { FC } from 'react';
import { baseRequestUrl } from '../../api/baseRequest';
import s from './DetailsCard.module.scss';

interface IDetailsCardProps {
  cardData: {
    foundationYear?: number;
    division?: string;
    conference?: string;
    number?: number;
    position?: string;
    teamName?: string;
    age?: number;
    height?: number;
    weight?: number;
  };
  name: string;
  image: string;
}

export const DetailsCard: FC<IDetailsCardProps> = ({image, name, cardData }) => {
console.log(cardData);

  return (
    <div className={s.details__card}>
      <div>
        <img src={`${baseRequestUrl}${image}`} alt="teamimg" />
      </div>
      <div>
        <h1>{name}</h1>
        <div className={s.details__card__description}>
          <div>
            <h3>Year of foundation</h3>
            <span>{cardData.foundationYear}</span>
          </div>
          <div>
            <h3>Division</h3>
            <span>{cardData.division}</span>
          </div>
          <div>
            <h3>Conference</h3>
            <span>{cardData.conference}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
