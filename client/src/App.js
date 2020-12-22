import './App.css';
import React, { useEffect, useRef } from 'react';
import Header from './Components/Header/header';
import Lenta from './Components/Lenta/lenta';
import Login from './Components/Login/login';
import People from './Components/People/people';
import Register from './Components/Register/register';
import Stats from './Components/Stats/stats';
import Advices from './Components/Advices/advices';
import Makewrong from './Components/MakeWrong/makewrong';
import ChatPrivat from './Components/Chat/chats';
import Fade from 'react-reveal/Fade';
import io from "socket.io-client";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Followers from './Components/People/Followers/Followers'
import Wrongs from './Components/Wrongs/wrongs';
import useStyles from './customHooks/useStyles';
import { checkAuth } from './redux/creators/users';
import { setSocket } from './redux/creators/socket';


function App() {
  const login = useSelector((state) => state.users);

  const dispatch = useDispatch()

  const classes = useStyles();
  // const socketRef = useRef()

  useEffect(() => {
    dispatch(checkAuth())
    const mySocket = io.connect('/')
    console.log(mySocket)
    dispatch(setSocket(mySocket))

    mySocket.on('hey', body => {
      console.log(body)
    })

  }, [])


  return (
    <Router>
      <div className={classes.root}>
        <Grid className={classes.first} container xs={12} spacing={1}>
          <Grid item xs={4} className={classes.grid}>
            
            <div className={classes.left}>
              <Header />
            </div>
            
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={6} className={classes.paper}>
            
            
              {login ? (
                <Switch>
                  <Route path="/register">
                    <Register />
                  </Route>
                  <Route path="/lk">
                    <Wrongs />
                  </Route>
                  <Route path="/lenta">
                    <Lenta />
                  </Route>
                  <Route path="/people">
                    <People />
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
                  <Route exact path="/">
                    <Login />
                  </Route>
                    <Route path="/chat/:id">
                      <ChatPrivat />
                  </Route>
                  {/* <Route>
                    <Followers exact path="/people/followers" />
                  </Route> */}
                </Switch>
              ) : (
                  <>
                    <Switch>
                      <Route path="/register">
                        <Register />
                      </Route>
                      <Route exact path="/">
                        <Login />
                      </Route>
                    </Switch>
                  </>
                )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );



  
}





export default App;
