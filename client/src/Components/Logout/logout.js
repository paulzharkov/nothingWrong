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
      color: '#67a3a3',
      marginTop: '20px',
      marginLeft: '65%',
      "&:hover": {
        backgroundColor: '#FFE0A1',
        color: 'white !important'
      }
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
        endIcon={<Icon>exit_to_app</Icon>}
        onClick={handlerOut}
      >
        Выйти
      </RandomButton>
    </div>
  );
}

export default Logout;
