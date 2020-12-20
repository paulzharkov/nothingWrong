import { useDispatch, useSelector } from "react-redux"
import * as AC from '../../../redux/creators/usersList'


function User({ login, email, id, subscribers }) {

  const dispatch = useDispatch()

  const myLogin = useSelector((state) => state.users)

  const subscribeHandler = () => {
    dispatch(AC.subscribeThunk(id, myLogin))
  }
  // console.log('myLogin', myLogin);

  // console.log('subscribers', subscribers);


  return (
    <div>
      <div>Логин: {login}</div>
      <div>Email: {email}</div>
      <button type="button" onClick={subscribeHandler}>Подписаться</button>
    </div>
  )
}

export default User
