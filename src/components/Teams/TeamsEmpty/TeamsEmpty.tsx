import teams__empty from '../../../assets/img/TeamsEmpty/teams__empty.png';
import { InputSearch } from '../../InputSearch/InputSearch';
import { AddBtn } from '../../AddBtn/AddBtn';
import '../../../scss/teams_players_common.scss'

export const TeamsEmpty = () => {
  return (
    <div className='common__container'>
      <div className='common__header'>
        <InputSearch />
        <AddBtn />
      </div>

      <div className='common__empty_content'>
        <div className='common__empty_content__container'>
          <div>
            <img src={teams__empty} alt="kids playing" />
            <p>Empty here</p>
            <span>Add new teams to continue</span>
          </div>
        </div>
      </div>
    </div>
  );
};
