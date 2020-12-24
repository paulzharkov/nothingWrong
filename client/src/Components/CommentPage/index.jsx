import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeStyles, TextField, Button } from '@material-ui/core';
import { getCommentsThunk, addCommentThunk } from '../../redux/creators/comments';
import OneComment from './OneComment/OneComment'
import Post from '../Post/Post'


function CommentPage() {

  const { id } = useParams();

  const dispatch = useDispatch()

  const commentsList = useSelector((state) => state.comments)
  const lentaPosts = useSelector((state) => state.lentaPosts)
  const post = lentaPosts.find((el) => el._id === id)

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
        <Post id={post._id}
          likes={post.likes}
          reason={post.reason}
          solve={post.solve}
          status={post.status}
          rating={post.rating}
          // date={post.date}
          comments={post.comments}
          category={post.category}
          offenderName={post.offenderName}
          authorName={post.authorName} />

        <form className={classes.root} noValidate autoComplete="off">
          <TextField value={text} onChange={(e) => setText(e.target.value)} label="Введите комментарий" type='text' />
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

