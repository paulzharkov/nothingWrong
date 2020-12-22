import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';


function CommentPage() {
  const [comment, setComment] = useState('');

  function handlerComment(e) {
    e.preventDefault()
    // dispatch(loginPersonThunk({ email, pass }))
    // history.push('/lk')
  }

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
  
  return (

  <form className={classes.root} noValidate autoComplete="off">
  <TextField value={comment} onChange={(event) => setComment(event.target.value)} label="Введите комментарий" type='text' required="true" />
  <Button
    variant="contained"
    color="primary"
    className={classes.button}
    // endIcon={<Icon>login</Icon>}
    onClick={handlerComment}
  >
      Click
  </Button>
  </form>
  )
  
}
export default CommentPage
  



