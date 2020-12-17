import { useState } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Lenta from '../Lenta/lenta';
import Lk from '../Lk/lk';
import Login from '../Login/login';
import Peoples from '../Peoples/peoples';
import Register from '../Register/register';
import Stats from '../Stats/stats'
import Advices from '../Advices/advices'
import Makewrong from '../MakeWrong/makewrong'
import Chat from '../Chat/chat'

function Header() {
  const [btn, setBtn] = useState(true)

  return (
    <div>
      <Router>
        <div>
          {btn ? (
            <>
              <div>
                <div><Link to="/">Войти</Link></div>
                <div><Link to="/register">Регистрация</Link></div>
              </div>
            </>
          ) : (
              <div>
                <div><Link to="/lk">Личный кабинет</Link></div>
                <div><Link to="/lenta">Лента</Link></div>
                <div><Link to="/peoples">Люди</Link></div>
                <div><Link to="/stats">Статистика</Link></div>
                <div><Link to="/advices">Советы</Link></div>
                <div><Link to="/makewrong">Создать обидку</Link></div>
                <div><Link to="/chat">Обсудить</Link></div>
              </div>
            )}
          <hr />
          <Switch>
            <Route exact path="/">
              <Login setBtn={setBtn} />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/lk">
              <Lk />
            </Route>
            <Route path="/lenta">
              <Lenta />
            </Route>
            <Route path="/peoples">
              <Peoples />
            </Route>
            <Route path="/stats">
              <Stats />
            </Route>
            <Route path="/advices">
              <Advices />
            </Route>
            <Route path="/makewrong">
              <Makewrong />
            </Route>
            <Route path="/chat">
              <Chat />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default Header
