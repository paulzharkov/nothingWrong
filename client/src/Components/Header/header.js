import { useSelector } from 'react-redux'
import style from './index.module.css'
import {
  Link,
} from 'react-router-dom';
import Logout from '../Logout/logout';
import logo from './logo2.jpg'

function Header() {

  const login = useSelector(state => state.users)

  return (
    <>
      <div className={style.headerDiv}>
        <div>
          <img className={style.headerLogo} src={logo} alt="logo" />
        </div>
        {login ? (
          <div className={style.headerLinks} >
            <div><Link to="/lk">Личный кабинет</Link></div>
            <div><Link to="/lenta">Лента</Link></div>
            <div><Link to="/people">Люди</Link></div>
            <div><Link to="/stats">Статистика</Link></div>
            <div><Link to="/advices">Советы</Link></div>
            <div><Link to="/makewrong">Создать обидку</Link></div>
            <div><Link to="/chat">Обсудить</Link></div>
            <hr />
            <div><Logout /></div>
            <div><Link to="/chatprivate">ОбсудитьПриватно</Link></div>
          </div>
        ) : (
            <div className={style.headerLink}>
              <div><Link to="/">Войти</Link></div>
              <div><Link to="/register">Регистрация</Link></div>
              <hr />
            </div>
          )}

      </div>
    </>
  )
}

export default Header
