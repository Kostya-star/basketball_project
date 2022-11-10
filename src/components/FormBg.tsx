import { FC } from 'react';
import '../scss/auth-common.scss';

interface IFormBgProps {
  src: string;
}

export const FormBg: FC<IFormBgProps> = ({ src }) => {

  return (
    <div className="auth__background">
      <p className="auth__background_img">
        <img src={src} alt="boys playing basketball" />
      </p>
    </div>
  );
};
