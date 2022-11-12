import { useNavigate } from 'react-router-dom';
import s from './AddBtn.module.scss';


export const AddBtn = () => {
  const navigate = useNavigate()

  const onAdd = () => {
    navigate('/TeamCreate')
  }

  return (
    <button onClick={onAdd} className={s.addBtn}>Add &nbsp;&nbsp;&nbsp;<strong>+</strong></button>
  )
}
