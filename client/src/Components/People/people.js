import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Header from './Header/Header'
import AllPeople from './AllPeople/AllPeople'
import Followers from './Followers/Followers'


function People() {
  return (
    <div>
      <Router>

        <Header />

        <Switch>

          <Route exact path='/people/followers'>
            <Followers />
          </Route>

          <Route exact path='/people/allpeople'>
            <AllPeople />
          </Route>

        </Switch>

      </Router>

    </div>
  )
}

export default People
