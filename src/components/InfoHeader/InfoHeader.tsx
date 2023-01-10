import { FC } from 'react';
import s from './InfoHeader.module.scss';
import { ReactComponent as EditSVG } from 'assets/icons/editSvg.svg';
import { ReactComponent as DeleteSVG } from 'assets/icons/deleteSvg.svg';
import { Link } from 'react-router-dom';

interface InfoHeaderProps {
  getBackLink: string;
  name: string;
  SVGs?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const InfoHeader: FC<InfoHeaderProps> = ({ getBackLink, name, SVGs, onEdit, onDelete }) => {
  return (
    <div className={s.infoHeader}>
      <div>
        <Link to={`/${getBackLink}`}>{getBackLink}</Link> / <span>{name}</span>
      </div>
      {SVGs && (
        <div>
          <EditSVG onClick={onEdit} />
          <DeleteSVG onClick={onDelete} />
        </div>
      )}
    </div>
  );
};
