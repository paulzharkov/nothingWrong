import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginPersonThunk } from '../../redux/creators/users';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import style from './index.module.css';

function Login() {
  const RandomButton = withStyles(() => ({
    root: {
      color: '#67a3a3',
      marginTop: '20px',
      marginLeft: '65%',
      '&:hover': {
        backgroundColor: '#FFE0A1',
        color: 'white !important',
      },
    },
  }))(Button);
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
      button: {
        margin: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();

  const loginRedux = useSelector((state) => state.users.length);

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  function handlerLogin(e) {
    e.preventDefault();
    dispatch(loginPersonThunk({ email, pass }));
    history.push('/lk');
  }

  return (
    <div className={style.formDiv}>
      <h2>Вход</h2>
      <form className={classes.root} autoComplete="off">
        <TextField
          size="small"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          label="Email"
          type="email"
          required
          error={email === ' '}
          helperText={email === ' ' ? 'Empty!' : ' '}
        />
        <TextField
          size="small"
          value={pass}
          onChange={(event) => setPass(event.target.value)}
          label="Пароль"
          type="password"
          required
          error={pass === ' '}
          helperText={pass === ' ' ? 'Empty!' : ' '}
        />
        <RandomButton
          variant="outlined"
          endIcon={<Icon>login</Icon>}
          onClick={handlerLogin}
        >
          Войти
        </RandomButton>
      </form>
    </div>
  );
}

export default Login;
