import { FC } from 'react';
import '../scss/serverRespPopUp.scss';
import classnames from 'classnames';


interface IRespErrorProps {
  text: string;
}

export const RespError: FC<IRespErrorProps> = ({ text }) => {

  const userNotExist = text === 'User with the specified login already exists'
  const userSuccess = text === 'User was created successfully'
  const userUnauthorized = text === 'Unauthorized'
  console.log(userUnauthorized);
  

  return (
    <div
      className={classnames('server__response', {
        // "auth__error_show": unauthorized ?? userExists,
        // "auth__error_hide": unauthorized === false || userExists === false
        "server__error": userNotExist || userUnauthorized,
        "server__success": userSuccess,
      })}
    >
      {text}
    </div>
  );
};
