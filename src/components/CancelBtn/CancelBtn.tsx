import { FC } from 'react';
import s from './CancelBtn.module.scss';

interface ICancelBtnProps {
  onClick: () => void;
}

export const CancelBtn: FC<ICancelBtnProps> = ({ onClick }) => (
  <button className={s.btn} onClick={onClick}>Cancel</button>
);
