import { useSelector } from 'react-redux'

import {
  Link,
} from 'react-router-dom';
import Logout from '../Logout/logout';

function Header() {

  const login = useSelector(state => state.users)
  console.log(login);
  return (
    <>
      <div>
        {login ? (
          <div >
            <div><Link to="/lk">Личный кабинет</Link></div>
            <div><Link to="/lenta">Лента</Link></div>
            <div><Link to="/people">Люди</Link></div>
            <div><Link to="/stats">Статистика</Link></div>
            <div><Link to="/advices">Советы</Link></div>
            <div><Link to="/makewrong">Создать обидку</Link></div>
            <div><Link to="/chat">Обсудить</Link></div>
            <div><Link to="/chatprivate">ОбсудитьПриватно</Link></div>
          </div>
        ) : (
            <div>
              <div><Link to="/">Войти</Link></div>
              <div><Link to="/register">Регистрация</Link></div>
            </div>
          )}
        <hr />
        <div><Logout /></div>
      </div>
    </>
  )
}

export default Header
