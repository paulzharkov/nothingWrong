import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useParams } from 'react-router-dom';

import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { getCommentsThunk, addCommentThunk } from '../../redux/creators/comments';
import OneComment from './OneComment/OneComment'


function CommentPage() {

  const { id } = useParams();

  const dispatch = useDispatch()

  const commentsList = useSelector((state) => state.comments)

  const [text, setText] = useState('');

  useEffect(() => {
    dispatch(getCommentsThunk({ id }));
  }, [dispatch]);


  function handlerComment(e) {
    e.preventDefault()
    dispatch(addCommentThunk({ id, text }));
    setText('')
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
    <>
      <div>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField value={text} onChange={(e) => setText(e.target.value)} label="Введите комментарий" type='text' required="true" />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handlerComment}
          >
            Click
        </Button>
        </form>
        {
          commentsList.length ? commentsList.map((el) => (
            <OneComment key={el._id} id={el._id} text={el.text} author={el.author} />
          )) : <div>Никто еще не комментировал эту обидку.</div>
        }
      </div>
    </>
  )
}


export default CommentPage

