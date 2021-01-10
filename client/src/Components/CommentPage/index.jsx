import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeStyles, TextField, Button, Icon, withStyles } from '@material-ui/core';
import { getCommentsThunk, addCommentThunk } from '../../redux/creators/comments';
import OneComment from './OneComment/OneComment'
import Post from '../Post/Post'

function CommentPage() {

  const { id } = useParams();

  const dispatch = useDispatch()

  const commentsList = useSelector((state) => state.comments)
  const feed = useSelector((state) => state.feed)
  const post = feed.find((el) => el._id === id)

  const [text, setText] = useState('');

  useEffect(() => {
    dispatch(getCommentsThunk({ id }));
  }, [dispatch]);


  function handlerComment(e) {
    console.log(e.key);
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

  const RandomButton = withStyles(() => ({
    root: {
      marginTop: '20px',
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

          <RandomButton
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handlerComment}
            endIcon={<Icon style={{ marginTop: '-6px' }}>comment</Icon>}>
            Comment!
        </RandomButton>
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

