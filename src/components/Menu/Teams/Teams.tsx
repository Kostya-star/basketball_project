import{ReactComponent as TeamsSVG} from '../../../assets/icons/menu__team.svg'
import '../../../scss/menu-common.scss'
import classnames from 'classnames'
import { FC } from 'react'
import { IMenuButtonProps } from './../Menu'



export const Teams: FC<IMenuButtonProps> = ({ isActive, setIsActive }) => {

  return (
    <>
    <div className='menu__teams'>
      <button type="submit" className={classnames({
        'menu__button': !isActive,
        'menu__button_keepFocus': isActive
      }) } onClick={() => setIsActive(true)}>
        <TeamsSVG/>
        <span>Teams</span>
      </button>
    </div>
    </>
  );
};
