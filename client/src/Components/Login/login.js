import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { loginPersonThunk } from '../../redux/creators/users'

function Login() {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();


  function handlerLogin(e) {
    e.preventDefault()
    dispatch(loginPersonThunk({ email, pass }))
    history.push('/lk')
  }


  return (
    <div>
      <form>
        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Введите email" />
        <input value={pass} onChange={(event) => setPass(event.target.value)} type="password" placeholder="Введите пароль" />
        <button onClick={handlerLogin}>Войти=</button>
      </form>
    </div>
  )
}

export default Login
