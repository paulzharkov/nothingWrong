import './App.css';
import React, { useEffect } from 'react';
import Header from './Components/Header/header';
import Lenta from './Components/Lenta/lenta';
import Login from './Components/Login/login';
import People from './Components/People/people';
import Register from './Components/Register/register';
import Stats from './Components/Stats/stats';
import Advices from './Components/Advices/advices';
import Makewrong from './Components/MakeWrong/makewrong';
import ChatPrivat from './Components/ChatPrivat';
import CommentPage from './Components/CommentPage';
import io from "socket.io-client";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { checkAuth } from './redux/creators/users';
import { setSocket } from './redux/creators/socket';

import HeaderWrongs from './Components/Wrongs/Header/HeaderWrongs';
import MyWrongs from './Components/Wrongs/MyWrongs/MyWrongs';
import ToMeWrongs from './Components/Wrongs/ToMeWrongs/ToMeWrongs';

function App() {
  const login = useSelector((state) => state.users);

  const dispatch = useDispatch()

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: '#B0E0E6',
    },
    paper: {
      textAlign: 'center',
      // color: theme.palette.text.secondary,
      height: '93vh',
      width: '100vw',
      display: 'flex',
      // padding: '0px',

      // background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)',
      // backgroundColor: '#e0ffff	',
    },
    first: {
      height: '100vh',
      justyfy: 'space-around',
      alignItems: 'stretch',
    },

    grid: {
      alignItems: 'center',
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    dispatch(checkAuth())
    const mySocket = io.connect('/')
    console.log(mySocket)
    dispatch(setSocket(mySocket))

    mySocket.on('hey', body => {
      console.log(body)
    })

  }, [dispatch])


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
                  <Route exact path="/lk">
                    <HeaderWrongs />
                  </Route>
                  <Route exact path='/lk/myWrongs'>
                    <MyWrongs />
                  </Route>
                  <Route exact path='/lk/toMeWrongs'>
                    <ToMeWrongs />
                  </Route>
                  <Route path="/lenta/:id">
                    <CommentPage />
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
