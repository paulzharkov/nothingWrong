import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, logoutThunk } from '../../redux/creators/users';
import { useHistory } from 'react-router-dom';

function Logout() {
  const login = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const history = useHistory();

  function handlerOut() {
    dispatch(logoutThunk(login));
    dispatch(logoutUser());
    history.push('/');
  }

  return (
    <div>
      <button onClick={handlerOut}>Выйти</button>
    </div>
  );
}

export default Logout;
