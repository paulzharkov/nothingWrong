import { useHistory } from 'react-router-dom'

function Login({ setBtn, btn }) {

  const history = useHistory()

  function loginHandler() {
    setBtn(false)
    history.push('/lk')
  }

  return (
    <div>

      <button onClick={loginHandler}>Войти</button>
    </div>
  )
}

export default Login
