import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import s from './AddBtn.module.scss';


interface IAddBtnProps {
  onRedirect: () => void
}

export const AddBtn: FC<IAddBtnProps> = ({ onRedirect }) => {
  const navigate = useNavigate()

  return (
    <button onClick={onRedirect} className={s.addBtn}>Add &nbsp;&nbsp;&nbsp;<strong>+</strong></button>
  )
}
