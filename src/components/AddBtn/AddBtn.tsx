import { FC } from 'react';
import s from './AddBtn.module.scss';


interface IAddBtnProps {
  onClick: () => void
}

export const AddBtn: FC<IAddBtnProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={s.addBtn}>Add &nbsp;&nbsp;&nbsp;<strong>+</strong></button>
  )
}
