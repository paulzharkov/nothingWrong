import './App.css';
import React, { useEffect } from 'react';
import Header from './Components/Header/header';
import Feed from './Components/Feed/feed';
import Login from './Components/Login/login';
import People from './Components/People/people';
import Register from './Components/Register/register';
import Advice from './Components/Advice/advice';
import Makewrong from './Components/MakeWrong/makewrong';
import ChatPrivat from './Components/ChatPrivat';
import CommentPage from './Components/CommentPage';
import io from 'socket.io-client';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Grid, Button } from '@material-ui/core';
import { checkAuth } from './redux/creators/users';
import { setSocket } from './redux/creators/socket';
import HeaderWrongs from './Components/Wrongs/Header/HeaderWrongs';
import MyWrongs from './Components/Wrongs/MyWrongs/MyWrongs';
import ToMeWrongs from './Components/Wrongs/ToMeWrongs/ToMeWrongs';
import {
  closeSnackbar,
  enqueueSnackbar,
  enqueueSnackbarThunk,
} from './redux/creators/notifier';
import Notifier from './Components/Notifier/Notifier';
import useStyles from './customHooks/useStyles';
import {
  changeAnswer,
  getAllMyPostsThunk,
  getAllToMePostsThunk,
  // getFeedPostsThunk,
} from './redux/creators/posts';

function App() {
  const login = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    const mySocket = io.connect('/');
    dispatch(setSocket(mySocket));
    dispatch(checkAuth());
    dispatch(getAllMyPostsThunk());
    dispatch(getAllToMePostsThunk());
    // dispatch(getFeedPostsThunk());
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
                  В чат
                </Button>
                <Button
                  color="secondary"
                  onClick={() => {
                    dispatch(closeSnackbar(key));
                  }}
                >
                  Отклонить
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
              action: (key) => (
                <>
                  <Button
                    className={classes.whiteText}
                    onClick={() => {
                      history.push(`/chat/${body.wrongID}`);
                      dispatch(closeSnackbar(key));
                    }}
                  >
                    В чат
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => {
                      dispatch(closeSnackbar(key));
                    }}
                  >
                    Отклонить
                  </Button>
                </>
              ),
            },
          },
          wrongID: body.wrongID,
        })
      );
    });

    mySocket.on('stop machine', (body) => {
      dispatch(
        enqueueSnackbar({
          message: body.title,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'info',
            autoHideDuration: 25000,
            action: (key) => (
              <>
                <Button
                  className={classes.whiteText}
                  onClick={() => {
                    history.push(`/wrong/answer/${body.wrongID}`);
                    dispatch(
                      changeAnswer({
                        id: body.wrongID,
                        answer: true,
                        user: login,
                      })
                    );
                    dispatch(closeSnackbar(key));
                  }}
                >
                  Да
                </Button>
                <Button
                  color="secondary"
                  onClick={() => {
                    history.push(`/wrong/answer/${body.wrongID}`);
                    dispatch(
                      changeAnswer({
                        id: body.wrongID,
                        answer: false,
                        user: login,
                      })
                    );
                    dispatch(closeSnackbar(key));
                  }}
                >
                  Нет
                </Button>
              </>
            ),
          },
        })
      );
    });

    mySocket.on('stop machine 2', (body) => {
      dispatch(
        enqueueSnackbar({
          message: body.title,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'info',
            autoHideDuration: 25000,
            action: (key) => (
              <>
                <Button
                  className={classes.whiteText}
                  onClick={() => {
                    history.push(`/wrong/answer/${body.wrongID}`);
                    dispatch(
                      changeAnswer({
                        id: body.wrongID,
                        answer: true,
                        user: login,
                      })
                    );
                    dispatch(closeSnackbar(key));
                  }}
                >
                  Да
                </Button>
                <Button
                  color="secondary"
                  onClick={() => {
                    history.push(`/wrong/answer/${body.wrongID}`);
                    dispatch(
                      changeAnswer({
                        id: body.wrongID,
                        answer: false,
                        user: login,
                      })
                    );
                    dispatch(closeSnackbar(key));
                  }}
                >
                  Нет
                </Button>
              </>
            ),
          },
        })
      );
    });
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
                  <Route exact path="/account">
                    <HeaderWrongs />
                  </Route>
                  <Route exact path="/account/myWrongs">
                    <MyWrongs />
                  </Route>
                  <Route exact path="/account/toMeWrongs">
                    <ToMeWrongs />
                  </Route>
                  <Route path="/feed/:id">
                    <CommentPage />
                  </Route>
                  <Route path="/feed">
                    <Feed />
                  </Route>
                  <Route path="/people">
                    <People />
                  </Route>
                  <Route path="/advice">
                    <Advice />
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
                  <Route path="/wrong/answer/:id">
                    <HeaderWrongs />
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
