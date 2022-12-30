import { FC } from 'react';
import { baseRequestUrl } from '../../api/baseRequest';
import { DetailsCardPlayerContent } from '../DetailsCardPlayerContent/DetailsCardPlayerContent';
import { DetailsCardTeamContent } from '../DetailsCardTeamContent/DetailsCardTeamContent';
import s from './DetailsCard.module.scss';

interface IDetailsCardProps {
  cardData: {
    name: string
    image: string
    foundationYear?: number
    division?: string
    conference?: string
    number?: number
    position?: string
    teamName?: string
    age?: number
    height?: number
    weight?: number
  };
}

export const DetailsCard: FC<IDetailsCardProps> = ({ cardData }) => {
  const {
    image,
    name,
    foundationYear,
    division,
    conference,
    position,
    teamName,
    number,
    height,
    weight,
    age,
  } = cardData;

  return (
    <div className={s.details__card}>
      <div>
        <img src={`${baseRequestUrl}${image}`} alt="teamimg" />
      </div>
      <div>
        <h1>{name} {number && <span>#{number}</span>}</h1>
        <div className={s.details__card__description}>
          {foundationYear && division && conference ? (
            <DetailsCardTeamContent
              foundationYear={foundationYear}
              division={division}
              conference={conference}
            />
          ) : (
            position &&
            teamName &&
            height &&
            weight && (
              <DetailsCardPlayerContent
                position={position}
                teamName={teamName}
                height={height}
                weight={weight}
                age={age}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};
