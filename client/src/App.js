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
    },
  }));

  const classes = useStyles();


  return (
    <Router>
      <div className={classes.root}>
        <Grid container xs={12} spacing={3} style={{ backgroundColor: "green" }} alignItems="stretch" >
          <Grid item xs={4}>
            <Paper className={classes.paper}>
            <Header />
            </Paper>
          </Grid>

          {login ?
            (
              <Switch>
                <Route path="/register">
                  <Grid item xs={8}>
                    <Paper className={classes.paper}>
                      <Register />
                    </Paper>
                  </Grid>
                </Route>
                <Route path="/lk">
                  <Grid item xs={8}>
                    <Paper className={classes.paper}>
                      <Lk />
                    </Paper>
                  </Grid>
                </Route>
                <Route path="/lenta">
                  <Grid item xs={8}>
                    <Paper className={classes.paper}>
                      <Lenta />
                    </Paper>
                  </Grid>
                </Route>
                <Route path="/peoples">
                  <Grid item xs={8}>
                    <Paper className={classes.paper}>
                      <Peoples />
                    </Paper>
                  </Grid>
                </Route>
                <Route path="/stats">
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                  <Stats />
                  </Paper>
                  </Grid>
                </Route>
                <Route path="/advices">
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                  <Advices />
                  </Paper>
                  </Grid>
                </Route>
                <Route path="/makewrong">
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                  <Makewrong />
                  </Paper>
                  </Grid>
                </Route>
                <Route path="/chat">
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                  <Chat />
                  </Paper>
                  </Grid>
                </Route>
                <Route exact path="/">
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                  <Login />
                  </Paper>
                  </Grid>
                </Route>
              </Switch>
            ) : (
              <>
                <Switch >
                  <Route path="/register">
                  <Grid item xs={8}>
                    <Paper className={classes.paper}>
                    <Register />
                    </Paper>
                  </Grid>
                  </Route>
                  <Route exact path="/">
                  <Grid item xs={8}>
                    <Paper className={classes.paper}>
                    <Login />
                    </Paper>
                  </Grid>
                  </Route>
                </Switch>
              </>
            )
          }
         
            
         
        </Grid>
      </div >
    </Router >
  );
}

export default App;
