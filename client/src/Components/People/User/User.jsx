import { useDispatch, useSelector } from "react-redux"
import * as AC from '../../../redux/creators/usersList'


function User({ login, email, id }) {

  const dispatch = useDispatch()

  const myLogin = useSelector((state) => state.users)

  const subscribeHandler = () => {
    dispatch(AC.subscribeThunk(id, myLogin))
  }

  return (
    <div>
      <div>Логин: {login}</div>
      <div>Имэйл: {email}</div>
      <button type="button" onClick={subscribeHandler}>Подписаться</button>
    </div>
  )
}

export default User
