import { FC } from 'react';

interface IDetailsCardTeamContentProps {
  foundationYear: number;
  division: string;
  conference: string;
}

export const DetailsCardTeamContent: FC<IDetailsCardTeamContentProps> = ({
  foundationYear,
  division,
  conference,
}) => {
  return (
    <>
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
    </>
  );
};
