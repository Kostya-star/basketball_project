import { ReactComponent as SearchSVG } from 'assets/icons/searchSvg.svg';
import { FC } from 'react';
import s from './InputSearch.module.scss';

interface InputSearchProps {
  value?: string;
  onChangeInput: (value: string) => void;
}

export const InputSearch: FC<InputSearchProps> = ({ value, onChangeInput }) => {
  return (
    <div className={s.search__input}>
      <input
        name="search__input"
        placeholder="Search..."
        type="search"
        value={value}
        onChange={(e) => onChangeInput(e.target.value)}
      />
      <SearchSVG />
    </div>
  );
};
