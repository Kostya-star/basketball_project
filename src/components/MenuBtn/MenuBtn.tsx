import classnames from 'classnames';
import { FC } from 'react';
import { ReactComponent as TeamsSVG } from '../../assets/icons/menu__team.svg';
import { ReactComponent as PlayersSVG } from '../../assets/icons/menu__players.svg';
import { ReactComponent as SignOutSVG } from '../../assets/icons/menu__signOut.svg';
import s from './MenuBtn.module.scss';

interface IMenuBtnProps {
  index: number;
  activeBtn: boolean;
  btnName: string;
  onClickHandle: (index: number) => void;
}

export const MenuBtn: FC<IMenuBtnProps> = ({ index, activeBtn, btnName, onClickHandle }) => {
  return (
    <button
      onClick={() => onClickHandle(index)}
      className={classnames(s.menu__button, {
        [s.menu__button_hovered]: !activeBtn,
        [s.menu__button_selected]: activeBtn,
      })}
      disabled={activeBtn}
    >
      {btnName === 'Teams' ? <TeamsSVG /> : btnName === 'Sign out' ? <SignOutSVG/> : <PlayersSVG />}
      <span>{btnName}</span>
    </button>
  );
};
