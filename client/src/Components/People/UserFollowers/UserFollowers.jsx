import { useDispatch, useSelector } from "react-redux"
import * as AC from '../../../redux/creators/usersList'


function UserFollowers({ login, email, id }) {

  const dispatch = useDispatch()

  const unSubscribeHandler = () => {
    dispatch(AC.unSubscribeThunk(id))
  }

  return (
    <div>
      <div>Логин: {login}</div>
      <div>Email: {email}</div>
      <button type="button" onClick={unSubscribeHandler}>Отписаться</button>
    </div>
  )
}

export default UserFollowers
