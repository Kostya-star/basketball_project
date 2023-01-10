import { FC } from 'react';
import { baseRequestUrl } from 'api/baseRequest';
import { IPlayerData } from 'types/players/players';
import s from './DetailsTable.module.scss';

interface IDetailsTableProps {
  playersInTable: IPlayerData[];
}

export const DetailsTable: FC<IDetailsTableProps> = ({ playersInTable }) => {
  return (
    <div className={s.table}>
      <table>
        <thead>
          <tr>
            <td style={{ fontSize: '18px' }}>Roster</td>
          </tr>
          <tr>
            <td width="5%">#</td>
            <td width="60%">Player</td>
            <td className={s.height}>Height</td>
            <td className={s.weight}>Weight</td>
            <td className={s.age}>Age</td>
          </tr>
        </thead>

        {playersInTable.map((player) => {
          const playerBirthYear = new Date(player.birthday).getFullYear();
          const yearNow = new Date().getFullYear();
          const playerAge = yearNow - playerBirthYear;

          return (
            <tbody key={player.id}>
              <tr>
                <td>{player.number}</td>
                <td>
                  <div className={s.table__playerBlock}>
                    <div>
                      <img src={`${baseRequestUrl}${player.avatarUrl}`} alt="" />
                    </div>
                    <div>
                      <div>{player.name}</div>
                      <div>
                        <span>{player.position}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className={s.height}>{player.height} cm</td>
                <td className={s.weight}>{player.weight} kg</td>
                <td className={s.age}>{playerAge}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};
