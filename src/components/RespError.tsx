import classnames from 'classnames';
import { FC, useEffect } from 'react';
import 'scss/serverRespPopUp.scss';

interface IRespErrorProps {
  response: string;
  setResponse: (resp: string) => void;
}

export const RespError: FC<IRespErrorProps> = ({ response, setResponse }) => {
  const userExists = response === 'User with the specified login already exists';
  const teamExists = response === 'Team with the specified name already exists';
  const playerExists = response === 'Player with the specified name already exists';
  const userSuccess = response === 'User was created successfully';
  const userUnauthorized = response === 'Unauthorized';
  const notFound = response === 'Not Found';
  const teamContainsPlayers = response === "Can't delete a team that contains players";

  useEffect(() => {
    if (response) {
      const authTimer = setTimeout(() => {
        setResponse('');
      }, 4000);
      return () => clearTimeout(authTimer);
    }
  }, [response]);

  return (
    <div
      className={classnames('server__response', {
        // "auth__error_show": unauthorized ?? userExists,
        // "auth__error_hide": unauthorized === false || userExists === false
        server__error:
          userExists ||
          userUnauthorized ||
          notFound ||
          teamContainsPlayers ||
          teamExists ||
          playerExists,
        server__success: userSuccess,
      })}
    >
      {response}
    </div>
  );
};
