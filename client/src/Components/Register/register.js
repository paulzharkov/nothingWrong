import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'
import { createPersonThunk } from '../../redux/creators/users'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';



function Register() {

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

  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();


  function handlerReg(e) {
    e.preventDefault()
    dispatch(createPersonThunk({ login, email, pass }))
    history.push('/lk')
  }


  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField value={login} onChange={(event) => setLogin(event.target.value)} label="Введите логин" type='text' required />
        <TextField value={email} onChange={(event) => setEmail(event.target.value)} label="Введите email" type="email" required />
        <TextField value={pass} onChange={(event) => setPass(event.target.value)} label="Введите пароль" type="password" required />
        <Button
          size="small"
          variant="contained"
          color='primary'
          className={classes.button}
          endIcon={<Icon>how_to_reg</Icon>}
          onClick={handlerReg}
        >
          Зарегистрироваться
      </Button>
      </form>
    </div>
  )
}

export default Register
