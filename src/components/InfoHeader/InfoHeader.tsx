import { FC } from 'react';
import s from './InfoHeader.module.scss'


interface InfoHeaderProps {
  text: string
}

export const InfoHeader: FC<InfoHeaderProps> = ({ text }) => {
  return (
    <div className={s.infoHeader}>
      {/* <p> */}
        <span>{text}</span>
      {/* </p> */}
    </div>
  );
};
