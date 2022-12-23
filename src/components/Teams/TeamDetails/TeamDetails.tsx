import { InfoHeader } from '../../InfoHeader/InfoHeader';
import { ReactComponent as EditSVG } from '../../../assets/icons/editSvg.svg';
import { ReactComponent as DeleteSVG } from '../../../assets/icons/deleteSvg.svg';
import teamIMG from '../../../assets/img/PlayersEmpty/players__empty.png';

export const TeamDetails = () => {
  return (
    <div className="common__container">
      <div className="common__details">
        <div className="common__header">
          <InfoHeader text="Teams / TEAM NAME" />
          <EditSVG />
          &nbsp; &nbsp;
          <DeleteSVG />
          &nbsp; &nbsp; &nbsp; &nbsp;
        </div>

        <div className="common__details__card">
          <div>
            <img src={teamIMG} alt="teamimg" />
          </div>
          <div>
            <h1>Denver Nuggets</h1>
            <div className="common__details__card__description">
              <p>
                <h3>Year of foundation</h3>
                <span>1976</span>
              </p>
              <p>
                <h3>Division</h3>
                <span>Northwestern</span>
              </p>
              <p>
                <h3>Conference</h3>
                <span>Western</span>
              </p>
            </div>
          </div>
        </div>

          <table className="common__details__list">
            <tr><td>Roster</td></tr>
            <tr>
              <td>#</td>
              <td>Player</td>
              <td>Height</td>
              <td>Weight</td>
              <td>Age</td>
            </tr>
            <tr>
              <td>#</td>
              <td>Player</td>
              <td>Height</td>
              <td>Weight</td>
              <td>Age</td>
            </tr>
          </table>
      </div>
    </div>
  );
};
