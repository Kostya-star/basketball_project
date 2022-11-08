import { useState } from 'react'
import { Players } from './Players/Players'
import { SignOut } from './SignOut/SignOut'
import { Teams } from './Teams/Teams'
import '../../scss/menu-common.scss'


export interface IMenuButtonProps {
  isActive: boolean
  setIsActive: (isActive: boolean) => void
}


export const Menu = () => {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="menu__wrapper">
      <div className="menu__group">
        <Teams isActive={isActive} setIsActive={setIsActive}/>
        <Players isActive={isActive} setIsActive={setIsActive}/>
      </div>
      <SignOut />
    </div>
  );
};
