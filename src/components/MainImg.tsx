import { FC } from 'react';
import '../scss/auth-common.scss';

interface IMainImgProps {
  src: string;
}

export const MainImg: FC<IMainImgProps> = ({ src }) => {
  return (
    <div className="auth__mainImg">
      <p className="auth__mainImg_bg">
        <img src={src} alt="boys playing basketball" />
      </p>
    </div>
  );
};
