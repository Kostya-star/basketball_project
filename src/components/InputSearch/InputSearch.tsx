import s from './InputSearch.module.scss'
import {ReactComponent as SearchSVG} from '../../assets/icons/searchSvg.svg'


export const InputSearch = () => {
  return (
    <div className={s.search__container}>
      <input className={s.search__input} placeholder='Search...' type="text" />
      <div className={s.search__svg}><SearchSVG/></div>
    </div>
  )
}
