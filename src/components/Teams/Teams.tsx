import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchTeams, removeTeam } from '../../redux/slices/teamsSlice';
import { AddBtn } from '../AddBtn/AddBtn';
import { InputSearch } from '../InputSearch/InputSearch';
import teams__empty from '../../assets/img/TeamsEmpty/teams__empty.png';
import { useAppDispatch, useAppSelector } from './../../redux/hooks';
import '../../scss/teams_players_common.scss';
import { Pagination } from '../pagination/Pagination';
import qs from 'qs';
import { createBrowserHistory } from 'history';
import { SelectComponent } from '../FormComponents/SelectComponent';


export const Teams = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { teams, currentPage, pageSize, teamsCount } = useAppSelector(({ teams }) => ({
    teams: teams.data,
    currentPage: teams.page,
    pageSize: teams.size,
    teamsCount: teams.count
  }));

  
  // URL---------------------
  const history = createBrowserHistory();
  
  const onFetchTeams = (currentPage: number, pageSize: number) => {
    void dispatch(fetchTeams(currentPage, pageSize)).then((resp) => {
      if (!resp?.data.data.length) {
        // if(teamsCount > 0) {
        //   void dispatch(fetchTeams(1, pageSize))
        //   .then(() => {
        //     return navigate(`?Page=${1}&PageSize=${pageSize}`);
        //   })
        // }
      }
      navigate(`?Page=${currentPage}&PageSize=${pageSize}`);
    })
  };
  
  useEffect(() => {
    if (!history.location.search) {
      if (pageSize === 25) {
        onFetchTeams(currentPage, 6);
        return;
      }
      onFetchTeams(currentPage, pageSize);
    } else {
      const UrlString = history.location.search.substring(1);
      const UrlObjFromString = qs.parse(UrlString);
      if (UrlObjFromString.Page && UrlObjFromString.PageSize) {
        onFetchTeams(Number(UrlObjFromString.Page), Number(UrlObjFromString.PageSize));
      }
    }
  }, []);

  const onPageChange = (currentPage: number) => {
    onFetchTeams(currentPage, pageSize)
  };
  
  // ---------------------
  
  // PAGINATION SELECT
  const onChange = (option: string) => {
    onFetchTeams(currentPage, Number(option))
  }
  
  const paginationSelectOptions = [
    { value: 6, label: 6 },
    { value: 12, label: 12 },
    { value: 24, label: 24 }
  ]
  // --------------

  const pagesAmount = Math.ceil(teamsCount / pageSize)

  const deleteTeam = (id: number) => {
    void dispatch(removeTeam(id));
  };

  const onRedirectCreateTeam = () => {
    return navigate('/TeamCreate');
  };


  return (
    <div className="common__container">
      <div className="common__header">
        <InputSearch />
        <AddBtn onClick={onRedirectCreateTeam} />
      </div>

      {teams.length ? (
        <div className="common__filled_content">
          {teams?.map((team, index) => (
            <div
              key={index}
              onClick={() => deleteTeam(team.id)}
              className="common__filled_content__block"
            >
              <img src={`http://dev.trainee.dex-it.ru${team.imageUrl}`} alt="team" />
              <div>
                <p>{team.name}</p>
                <span>Year of foundation: {team.foundationYear}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="common__empty_content">
          <div className="common__empty_content__container">
            <div>
              <img src={teams__empty} alt="kids playing" />
              <p>Empty here</p>
              <span>Add new teams to continue</span>
            </div>
          </div>
        </div>
      )}

      <div className="common__pagination">
        <Pagination
          currentPage={currentPage}
          pagesAmount={pagesAmount}
          onPageChange={onPageChange}
        />
        <SelectComponent<'pagination_select'>
          name="pagination_select"
          isMulti={false}
          options={paginationSelectOptions}
          menuPlacement={'top'}
          value={paginationSelectOptions.find((option) => option.value === pageSize)}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
