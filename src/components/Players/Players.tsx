import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchPlayers } from '../../redux/slices/playersSlice';





export const Players = () => {
  const dispatch = useAppDispatch()
  const players = useAppSelector((state) => state.players.data)

  const navigate = useNavigate()

  useEffect(() => {
    void dispatch(fetchPlayers())
  }, [])

  useEffect(() => {
    if(JSON.stringify(players) === '[]') {
      return navigate('/PlayersEmpty')
    }
  }, [players])

  return (
    <div>Players</div>
  )
}
