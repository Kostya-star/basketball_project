import { ReactComponent as PlayersSVG } from '../../../assets/icons/menu__players.svg';
import '../../../scss/menu-common.scss';

export const Players = () => {
  return (
    <>
      <div className="menu__players">
        <button type="submit">
          <PlayersSVG />
          <span>Players</span>
        </button>
      </div>
    </>
  );
};
