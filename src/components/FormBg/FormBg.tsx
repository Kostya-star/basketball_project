import { FC } from 'react';
import s from  './FormBg.module.scss';

interface IFormBgProps {
  src: string;
}

export const FormBg: FC<IFormBgProps> = ({ src }) => {

  return (
    <div className={s.auth__background}>
      <p className={s.auth__background_img}>
        <img src={src} alt="boys playing basketball" />
      </p>
    </div>
  );
};
