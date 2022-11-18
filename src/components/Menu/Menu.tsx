import { useState, useEffect, FC } from 'react';
import { SignOut } from './SignOut/SignOut';
import '../../scss/menu-common.scss';
import classnames from 'classnames';
import { ReactComponent as TeamsSVG } from '../../assets/icons/menu__team.svg';
import { ReactComponent as PlayersSVG } from '../../assets/icons/menu__players.svg';
import { useNavigate } from 'react-router-dom'


export interface IMenuButtonProps {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}

export const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<number | boolean>(0);
  const navigate = useNavigate()
  
  // useEffect(() => {
  //   navigate('/Teams')
  // }, [])

  const onToggleRoute = (categoryName: string) => {
    categoryName === 'Teams' ? navigate('/Teams') : navigate('/Players')
  }
  
  const menuCategories = ['Teams', 'Players'];

  return (
    <div className="menu__wrapper">
      <div className="menu__group">
        {menuCategories.map((categoryName, index) => (
          <div key={index}>
            <button
              type="submit"
              className={classnames({
                'menu__button': Number(activeCategory) !== index,
                'menu__button_keepFocus': Number(activeCategory) === index
              }) }
              onClick={() => setActiveCategory(index)}
            >
              {categoryName === 'Teams' && (<div onClick={() => onToggleRoute(categoryName)} className='menu__teams'><TeamsSVG /><span>{categoryName}</span></div>)}

              {categoryName === 'Players' && (<div onClick={() => onToggleRoute(categoryName)}><PlayersSVG /><span>{categoryName}</span></div>)}

            </button>
          </div>
        ))}
      </div>
      <SignOut />
    </div>
  );
};
