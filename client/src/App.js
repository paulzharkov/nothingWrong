import './App.css';
import Header from './Components/Header/header';
import Lenta from './Components/Lenta/lenta';
import Login from './Components/Login/login';
import People from './Components/People/people';
import Register from './Components/Register/register';
import Stats from './Components/Stats/stats';
import Advices from './Components/Advices/advices';
import Makewrong from './Components/MakeWrong/makewrong';
import ChatPrivat from './Components/ChatPrivat';
import Fade from 'react-reveal/Fade';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Followers from './Components/People/Followers/Followers'
import Wrongs from './Components/Wrongs/wrongs';
import CommentPage from './Components/CommentPage';

function App() {
  const login = useSelector((state) => state.users);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: '#B0E0E6',
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: '100vh',
      width: '100vw',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      // background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)'
      backgroundColor: '#e0ffff	',
    },
    first: {
      height: '100vh',
      justyfy: 'space-around',
      alignItems: 'stretch',
    },

    grid: {
      // height: '100vh',
      alignItems: 'center',
    },
    
  }));

  const classes = useStyles();

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
                    <Route exact path="/chatprivate">
                    <Fade right>
                      <ChatPrivat />
                    </Fade>
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
