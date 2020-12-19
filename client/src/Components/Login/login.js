import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { loginPersonThunk } from '../../redux/creators/users'
import Input from '@material-ui/core/Input'
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

function Login() {

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

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();


  function handlerLogin(e) {
    e.preventDefault()
    dispatch(loginPersonThunk({ email, pass }))
    history.push('/lk')
  }


  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Введите email" inputProps={{ 'aria-label': 'description' }} />
        <Input value={pass} onChange={(event) => setPass(event.target.value)} placeholder="Введите пароль" />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<Icon>login</Icon>}
          onClick={handlerLogin}
        >
          Войти
      </Button>
      </form>
    </div>
  )
}

export default Login
