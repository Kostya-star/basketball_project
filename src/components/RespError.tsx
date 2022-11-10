import { FC } from 'react';
import '../scss/auth-common.scss';
import classnames from 'classnames';
import { useAppSelector } from '../redux/hooks';


interface IRespErrorProps {
  text: string;
}

export const RespError: FC<IRespErrorProps> = ({ text }) => {
  const { unauthorized, userExists } = useAppSelector(({ auth }) => ({
    unauthorized: auth.error.unauthorized,
    userExists: auth.error.userExists,
  }));


  return (
    <div
      className={classnames('auth__error', {
        "auth__error_show": unauthorized ?? userExists,
        "auth__error_hide": unauthorized === false || userExists === false
      })}
    >
      {text}
    </div>
  );
};
