import s from './InputSearch.module.scss';
import { ReactComponent as SearchSVG } from '../../assets/icons/searchSvg.svg';

export const InputSearch = () => {

  const onChangeInput = (value: string) => {
    console.log(value);
  };

  return (
    <div className={s.search__container}>
      <input
        className={s.search__input}
        placeholder="Search..."
        type="text"
        onChange={(e) => onChangeInput(e.target.value)}
      />
      <div className={s.search__svg}>
        <SearchSVG />
      </div>
    </div>
  );
};
