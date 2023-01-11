import { FC } from 'react';

interface IDetailsCardPlayerContentProps {
  position: string;
  teamName: string;
  height: number;
  weight: number;
  age?: number;
}

export const DetailsCardPlayerContent: FC<IDetailsCardPlayerContentProps> = ({
  position,
  teamName,
  height,
  weight,
  age,
}) => {
  return (
    <>
      <div>
        <h3>Position</h3>
        <span>{position}</span>
      </div>
      <div>
        <h3>Team</h3>
        <span>{teamName}</span>
      </div>
      <div>
        <h3>Height</h3>
        <span>{height}</span>
      </div>
      <div>
        <h3>Weight</h3>
        <span>{weight}</span>
      </div>
      <div>
        <h3>Age</h3>
        <span>{age}</span>
      </div>
    </>
  );
};
