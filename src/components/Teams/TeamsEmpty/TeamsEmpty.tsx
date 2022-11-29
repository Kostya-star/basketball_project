import teams__empty from '../../../assets/img/TeamsEmpty/teams__empty.png';
import { InputSearch } from '../../InputSearch/InputSearch';
import { AddBtn } from '../../AddBtn/AddBtn';
import '../../../scss/teams_players_common.scss'
import { useNavigate } from 'react-router-dom';

export const TeamsEmpty = () => {
  const navigate = useNavigate()

  const onRedirectCreateTeam = () => {
    navigate('/TeamCreate')
  }

  return (
    <div className='common__container'>
      <div className='common__header'>
        <InputSearch />
        <AddBtn onClick={onRedirectCreateTeam}/>       
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
