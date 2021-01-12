import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPersonThunk } from '../../redux/creators/users';
import {
  makeStyles,
  withStyles,
  TextField,
  Icon,
  Button,
} from '@material-ui/core';
import style from './index.module.css';

function Register() {
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
  }))(Button);
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(2),
      },
      button: {
        margin: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();

  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  function handlerReg(e) {
    e.preventDefault();
    dispatch(createPersonThunk({ login, email, pass }));
    history.push('/makewrong');
  }

  return (
    <div className={style.regDiv}>
      <h2>Регистрация</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          label="Введите логин"
          type="text"
          required
        />
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Введите email"
          type="email"
          required
        />
        <TextField
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          label="Введите пароль"
          type="password"
          required
        />
        <RandomButton
          variant="outlined"
          endIcon={<Icon style={{ marginTop: '-6px' }}>how_to_reg</Icon>}
          onClick={handlerReg}
          size="large"
        >
          Продолжить
        </RandomButton>
        <p>Уже есть аккаунт?</p>
        <RandomButton
          variant="outlined"
          endIcon={<Icon style={{ marginTop: '-6px' }}>login</Icon>}
          onClick={() => {
            history.push('/');
          }}
        >
          Войти
        </RandomButton>
      </form>
    </div>
  );
}

export default Register;
