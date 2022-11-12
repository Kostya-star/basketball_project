import s from './TeamsEmpty.module.scss';
import teams__empty from '../../../assets/img/TeamsEmpty/teams__empty.png';
import { InputSearch } from '../../InputSearch/InputSearch';
import { AddBtn } from '../../AddBtn/AddBtn';

export const TeamsEmpty = () => {
  return (
    <div className={s.teamsEmpty__container}>
      <div className={s.teamsEmpty__header}>
        <InputSearch />
        <AddBtn />
      </div>

      <div className={s.teamsEmpty__content}>
        <div className={s.teamsEmpty__content__container}>
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
