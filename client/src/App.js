import './App.css';
import Header from './Components/Header/header';
import Lenta from './Components/Lenta/lenta';
import Lk from './Components/Lk/lk';
import Login from './Components/Login/login';
import Peoples from './Components/Peoples/peoples';
import Register from './Components/Register/register';
import Stats from './Components/Stats/stats';
import Advices from './Components/Advices/advices';
import Makewrong from './Components/MakeWrong/makewrong';
import Chat from './Components/Chat/chat';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux'

function App() {
  const login = useSelector(state => state.users)
  return (
    <>
      <Router>
        <div>
        <Chat />
          <Header />
        </div>
        <div>
          <div>
            {login ?
              (
                <Switch>
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
                  <Route exact path="/">
                    <Login />
                  </Route>
                </Switch>
              ) : (
                <>
                  <Switch >
                    <Route path="/register">
                      <Register />
                    </Route>
                    <Route exact path="/">
                      <Login />
                    </Route>
                  </Switch>
                </>
              )
            }
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
