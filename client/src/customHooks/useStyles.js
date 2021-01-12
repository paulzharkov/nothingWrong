<<<<<<< HEAD
import { makeStyles } from '@material-ui/core/styles';
=======
import { makeStyles } from '@material-ui/core';
>>>>>>> 4eed6750d7ec894d3b53d7f90adbb41730062e36

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#B0E0E6',
  },
<<<<<<< HEAD
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
    width: '100vw',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    // background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)'
    backgroundColor: '#e0ffff	',
=======
  whiteText: {
    color: "white"
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '95vh',
    width: '100vw',
    display: 'flex',
    padding: '0px',

    // background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)'
    // backgroundColor: '#e0ffff	',
>>>>>>> 4eed6750d7ec894d3b53d7f90adbb41730062e36
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
<<<<<<< HEAD
  
=======
>>>>>>> 4eed6750d7ec894d3b53d7f90adbb41730062e36
}));

export default useStyles
