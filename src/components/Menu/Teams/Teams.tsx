import { ReactComponent as TeamsSVG } from '../../../assets/icons/menu__teams.svg';
import '../../../scss/menu-common.scss'

export const Teams = () => {
  return (
    <>
    <div className='menu__teams'>
      <button type="submit">
        <TeamsSVG />
        <span>Teams</span>
      </button>
    </div>
    </>
  );
};
