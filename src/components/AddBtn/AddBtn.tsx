import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import s from './AddBtn.module.scss';


interface IAddBtnProps {
  onAdd: () => void
}

export const AddBtn: FC<IAddBtnProps> = ({ onAdd }) => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <button onClick={onAdd} className={s.addBtn}>Add &nbsp;&nbsp;&nbsp;<strong>+</strong></button>
  )
}
