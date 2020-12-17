import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'

function Register() {

  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();


  function handlerReg(e) {
    e.preventDefault()
    dispatch(AC.createPerson({ login, email, pass }))
    history.push('/lk')
  }


  return (
    <div>
      <form onSubmit={handlerReg}>
        <input value={login} onChange={(event) => setLogin(event.target.value)} type="text" placeholder="Введите логин" />
        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Введите email" />
        <input value={pass} onChange={(event) => setPass(event.target.value)} type="password" placeholder="Введите пароль" />
        <button onClick={handlerReg}>Зарегистрироваться</button>
      </form>
    </div>
  )
}

export default Register
