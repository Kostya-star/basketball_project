import { FC } from 'react';
import s from './InfoHeader.module.scss';
import { ReactComponent as EditSVG } from '../../assets/icons/editSvg.svg';
import { ReactComponent as DeleteSVG } from '../../assets/icons/deleteSvg.svg';
import { Link } from 'react-router-dom';
import { Teams } from './../Teams/Teams';

interface InfoHeaderProps {
  getBackLink: string;
  name: string;
  SVGs?: boolean;
  onEditTeamHandle?: () => void;
  onDeleteTeamHandle?: () => void;
}

export const InfoHeader: FC<InfoHeaderProps> = ({
  getBackLink,
  name,
  SVGs,
  onEditTeamHandle,
  onDeleteTeamHandle,
}) => {
  return (
    <div className={s.infoHeader}>
      <div>
        <Link to={`/${getBackLink}`}>{getBackLink}</Link> / <span>{name}</span>
      </div>
      {SVGs && (
        <div>
          <EditSVG onClick={onEditTeamHandle} />
          <DeleteSVG onClick={onDeleteTeamHandle} />
        </div>
      )}
    </div>
  );
};
