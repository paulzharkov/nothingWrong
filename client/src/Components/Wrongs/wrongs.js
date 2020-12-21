import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import MyWrongs from './MyWrongs/MyWrongs';
import HeaderWrongs from './Header/HeaderWrongs';
import ToMeWrongs from './ToMeWrongs/ToMeWrongs';


function Wrongs() {
  return (
    <div>
      <Router>
        <HeaderWrongs />
        <Switch>

          <Route exact path='/lk/myWrongs'>
            <MyWrongs />
          </Route>

          <Route exact path='/lk/toMeWrongs'>
            <ToMeWrongs />
          </Route>

        </Switch>

      </Router>

    </div>
  )
}

export default Wrongs
