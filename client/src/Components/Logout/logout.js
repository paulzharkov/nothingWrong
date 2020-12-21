import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, logoutThunk } from '../../redux/creators/users';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

function Logout() {

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
      button: {
        margin: theme.spacing(1),
      }
    },
  }));

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
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        endIcon={<Icon>exit_to_app</Icon>}
        onClick={handlerOut}
      >
        Выйти
      </Button>
    </div>
  );
}

export default Logout;
