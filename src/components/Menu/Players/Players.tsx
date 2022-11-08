import { FC } from 'react';
import { ReactComponent as PlayersSVG } from '../../../assets/icons/menu__players.svg';
import '../../../scss/menu-common.scss';
import classnames from 'classnames';
import { IMenuButtonProps } from './../Menu';

export const Players: FC<IMenuButtonProps> = ({ isActive, setIsActive }) => {
  return (
    <>
      <div className="menu__players">
      <button type="submit" className={classnames({
      'menu__button': !isActive,
      'menu__button_keepFocus': isActive
    }) } onClick={() => setIsActive(true)}>
          <PlayersSVG/>
          <span>Players</span>
        </button>
      </div>
    </>
  );
};

