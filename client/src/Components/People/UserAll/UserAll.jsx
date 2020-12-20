import { useDispatch, useSelector } from "react-redux"
import * as AC from '../../../redux/creators/usersList'


function UserAll({ login, email, id, subscribers }) {

  const dispatch = useDispatch()

  const myLogin = useSelector((state) => state.users)

  const subscribeHandler = () => {
    dispatch(AC.subscribeThunk(id, myLogin))
  }

  return (
    <div>
      <div>Логин: {login}</div>
      <div>Email: {email}</div>
      <button type="button" onClick={subscribeHandler}>Подписаться</button>
    </div>
  )
}

export default UserAll
