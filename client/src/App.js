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
import Fade from 'react-reveal/Fade';
import io from 'socket.io-client';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { checkAuth } from './redux/creators/users';
import { setSocket } from './redux/creators/socket';
import HeaderWrongs from './Components/Wrongs/Header/HeaderWrongs';
import MyWrongs from './Components/Wrongs/MyWrongs/MyWrongs';
import ToMeWrongs from './Components/Wrongs/ToMeWrongs/ToMeWrongs';
// import sky from './Components/sky.png';
import Button from '@material-ui/core/Button';
import {
  closeSnackbar,
  enqueueSnackbar,
  enqueueSnackbarThunk,
} from './redux/creators/notifier';
import Notifier from './Components/Notifier/Notifier';
import useStyles from './customHooks/useStyles';
import { getAllMyPostsThunk, getAllToMePostsThunk } from './redux/creators/posts';


function App() {
  const login = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const history = useHistory();
  const params = useParams();
  console.log('start', Object.keys(params).length);
  const classes = useStyles();

  useEffect(() => {
    if(login) {
    dispatch(checkAuth())
    dispatch(getAllMyPostsThunk())
    dispatch(getAllToMePostsThunk())
    const mySocket = io.connect('/')
    dispatch(setSocket(mySocket))

    mySocket.on('wrong notification', (body) => {
      dispatch(
        enqueueSnackbar({
          message: body.title,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'warning',
            autoHideDuration: 25000,
            action: (key) => (
              <>
                <Button
                  className={classes.whiteText}
                  onClick={() => {
                    history.push(`/chat/${body.wrongID}`);
                    dispatch(closeSnackbar(key));
                  }}
                >
                  CHAT
                </Button>
                <Button
                  color="secondary"
                  onClick={() => {
                    dispatch(closeSnackbar(key));
                  }}
                >
                  Dismiss
                </Button>
              </>
            ),
          },
        })
      );
    });

    mySocket.on('message notification', (body) => {
      dispatch(
        enqueueSnackbarThunk({
          notification: {
            message: body.title,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
              autoHideDuration: 10000,
              action: key => (
                <>
                  <Button
                    className={classes.whiteText}
                    onClick={() => {
                      history.push(`/chat/${body.wrongID}`);
                      dispatch(closeSnackbar(key));
                    }}
                  >
                    CHAT
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => {
                      dispatch(closeSnackbar(key));
                    }}
                  >
                    Dismiss
                  </Button>
                </>
              ),
            },
          },
          wrongID: body.wrongID}))
        })
    }
  }, [login]);


  return (
    <>
      <Notifier />
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
                  <Route exact path="/lk/myWrongs">
                    <MyWrongs />
                  </Route>
                  <Route exact path="/lk/toMeWrongs">
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
    </>
  );
}

export default App;
