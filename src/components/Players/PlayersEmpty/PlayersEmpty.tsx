import { AddBtn } from "../../AddBtn/AddBtn"
import { InputSearch } from "../../InputSearch/InputSearch"
import players__empty from '../../../assets/img/PlayersEmpty/players__empty.png'
import { useNavigate } from "react-router-dom"



export const PlayersEmpty = () => {

  const navigate = useNavigate()

  const onRedirectCreatePlayer = () => {
    navigate('/PlayersCreate')
  }

  return (
    <div className='common__container'>
    <div className='common__header'>
      <InputSearch />
      <AddBtn onRedirect={onRedirectCreatePlayer}/>
    </div>

    <div className='common__empty_content'>
      <div className='common__empty_content__container'>
        <div>
          <img src={players__empty} alt="kids playing" />
          <p>Empty here</p>
          <span>Add new teams to continue</span>
        </div>
      </div>
    </div>
  </div>
  )
}
