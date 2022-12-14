import { FC } from 'react';
import s from './Empty.module.scss'


interface IEmptyProps {
  image: string
  text: string
}

export const Empty: FC<IEmptyProps> = ({ image, text }) => {
  return (
    <div className={s.empty__container}>
      <div>
        <img src={image} alt="kids playing" />
        <p>Empty here</p>
        <span>Add new {text} to continue</span>
      </div>
    </div>
  );
};
