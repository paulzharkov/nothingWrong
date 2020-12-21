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
import ChatPrivat from './Components/ChatPrivat';
import Fade from 'react-reveal/Fade';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

function App() {
  const login = useSelector(state => state.users)

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: '100vh',
      justifyContent: 'center',
      alignItems: "center",
      display: 'flex',
    },
    first: {
      height: '100vh',
      justyfy: "space-around",
      alignItems: "stretch"
    },

    grid: {
      // height: '100vh',
      alignItems: "center"
    }
  }));

  const classes = useStyles();


  return (
    <Router>
      <div className={classes.root}>
        <Grid className={classes.first} container xs={12} spacing={1}>
          <Grid item xs={4} className={classes.grid}>
            <Paper elevation={6} className={classes.paper}><Header /></Paper>
          </Grid>
          <Grid item xs={8} >
            <Paper elevation={6} className={classes.paper}  >
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
                    <Route exact path="/chatprivate">
                    <Fade right>
                      <ChatPrivat />
                      </Fade>
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
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
}

export default App;
