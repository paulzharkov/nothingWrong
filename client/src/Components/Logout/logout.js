import { useSelector } from 'react-redux'
import { logoutThunk } from '../../redux/creators/users'
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'

function Logout() {

  const login = useSelector(state => state.users)
  const dispatch = useDispatch();
  const history = useHistory();

  function handlerOut() {
    dispatch(logoutThunk(login))
    history.push('/')
  }

  return (
    <div>
      <button onClick={handlerOut}>Выйти</button>
    </div>
  )
}

export default Logout
