import { useState, useEffect, FC } from 'react';
import { SignOut } from './SignOut/SignOut';
import '../../scss/menu-common.scss';
import classnames from 'classnames';
import { ReactComponent as TeamsSVG } from '../../assets/icons/menu__team.svg';
import { ReactComponent as PlayersSVG } from '../../assets/icons/menu__players.svg';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

export interface IMenuButtonProps {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}

export const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const navigate = useNavigate();

  const onToggleRoute = (categoryName: string) => {
    categoryName === 'Teams' ? navigate('/Teams') : navigate('/Players');
  };

  const menuCategories = ['Teams', 'Players'];

  return (
    <div className="menu__wrapper">
      <div className="menu__group">
        {menuCategories.map((categoryName, index) => (
          <div className="menu__block" key={categoryName + '_' + index}>
            <div key={index}>
              <div>
                {categoryName === 'Teams' && (
                  <button
                    onClick={() => {
                      setActiveCategory(index);
                      onToggleRoute(categoryName);
                    }}
                    className={classnames({
                      menu__button: activeCategory !== index,
                      menu__button_selected: activeCategory === index,
                    })}
                    disabled={activeCategory === index}
                  >
                    <TeamsSVG />
                    <span>{categoryName}</span>
                  </button>
                )}

                {categoryName === 'Players' && (
                  <button
                    onClick={() => {
                      setActiveCategory(index);
                      onToggleRoute(categoryName);
                    }}
                    className={classnames({
                      menu__button: activeCategory !== index,
                      menu__button_selected: activeCategory === index,
                    })}
                    disabled={activeCategory === index}
                  >
                    <PlayersSVG />
                    <span>{categoryName}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <SignOut />
    </div>
  );
};
