import s from './InputSearch.module.scss';
import { ReactComponent as SearchSVG } from '../../assets/icons/searchSvg.svg';
import { FC } from 'react';


interface InputSearchProps {
  value: string
  onChangeInput: (value: string) => void
}

export const InputSearch: FC<InputSearchProps> = ({ value, onChangeInput }) => {

  return (
    <div className={s.search__container}>
      <input
        name='search__input'
        className={s.search__input}
        placeholder="Search..."
        type="text"
        value={value}
        onChange={(e) => onChangeInput(e.target.value)}
      />
      <div className={s.search__svg}>
        <SearchSVG />
      </div>
    </div>
  );
};
