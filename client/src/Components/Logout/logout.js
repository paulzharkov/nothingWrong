import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, logoutThunk } from '../../redux/creators/users';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

function Logout() {

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  const RandomButton = withStyles(() => ({
    root: {
      marginTop: '20px',
      marginLeft: '65%',
      '&:hover': {
        backgroundColor: '#b0e0e6',
        color: 'white !important',
      },
      color: '#FFF',
      border: '2px solid #67a3a3',
      fontSize: '16px',
      boxShadow: '3px 4px 5px #0000003b',
      fontWeight: 'bold',
      paddingTop: '10px',
      backgroundColor: '#67a3a3',
    },
  }))(Button)

  const classes = useStyles();

  const login = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const history = useHistory();

  function handlerOut() {
    dispatch(logoutThunk(login));
    dispatch(logoutUser());
    history.push('/');
  }

  return (
    <div>
      <RandomButton
        variant="outlined"
        endIcon={<Icon style={{ marginTop: '-6px' }}>exit_to_app</Icon>}
        onClick={handlerOut}
      >
        Выйти
      </RandomButton>
    </div>
  );
}

export default Logout;
