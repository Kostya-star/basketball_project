import { FC } from 'react';
import { baseRequestUrl } from '../../api/baseRequest';
import s from './DetailsCard.module.scss'


interface IDetailsCardProps {
  imageUrl: string
  name: string
  foundationYear: number
  division: string
  conference: string
}

export const DetailsCard: FC<IDetailsCardProps> = ({ imageUrl, name, foundationYear, division, conference }) => {
  return (
    <div className={s.details__card}>
      <div>
        <img src={`${baseRequestUrl}${imageUrl}`} alt="teamimg" />
      </div>
      <div>
        <h1>{name}</h1>
        <div className={s.details__card__description}>
          <div>
            <h3>Year of foundation</h3>
            <span>{foundationYear}</span>
          </div>
          <div>
            <h3>Division</h3>
            <span>{division}</span>
          </div>
          <div>
            <h3>Conference</h3>
            <span>{conference}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
