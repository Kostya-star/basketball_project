import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import s from './AddBtn.module.scss';


interface IAddBtnProps {
  onClick: () => void
}

export const AddBtn: FC<IAddBtnProps> = ({ onClick }) => {
  const navigate = useNavigate()

  return (
    <button onClick={onClick} className={s.addBtn}>Add &nbsp;&nbsp;&nbsp;<strong>+</strong></button>
  )
}
