import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import MyWrongs from './MyWrongs/MyWrongs';
import HeaderWrongs from './Header/HeaderWrongs';
import ToMeWrongs from './ToMeWrongs/ToMeWrongs';
import ChatPrivat from '../ChatPrivat/index.js';


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

          <Route exact path='/chat/:id'>
            <ChatPrivat />
          </Route>

        </Switch>

      </Router>

    </div>
  )
}

export default Wrongs
