import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPersonThunk } from '../../redux/creators/users';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import style from './index.module.css'

function Register() {

  const RandomButton = withStyles(() => ({
    root: {
      backgroundColor: '#FFF',
      color: '#67a3a3',

    },
  }))(Button)
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(3),
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
    history.push('/lk');
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
          endIcon={<Icon>how_to_reg</Icon>}
          onClick={handlerReg}
          size="large"
        >
          Продолжить
        </RandomButton>
      </form>
    </div>
  );
}

export default Register;
