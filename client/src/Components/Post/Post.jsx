import { useDispatch, useSelector } from "react-redux"
import * as AC from '../../redux/creators/posts'
import { useHistory } from 'react-router-dom'
import { makeStyles, Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import imgFamily from './family.jpeg'
import imgHome from './home.jpeg'
import imgMoney from './money.jpeg'
import imgShout from './shout.jpeg'
import style from './index.module.css';

const useStyles = makeStyles({
  root1: {
    boxShadow: '0 4px 0 #67a3a3',
    marginBottom: '7px',
  },
  root2: {
    boxShadow: '6px 6px 6px #FFA500',
    marginBottom: '7px',
  },
  root3: {
    boxShadow: '6px 6px 6px red',
    marginBottom: '7px',
  },
  postImage: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttons: {
    display: 'flex',
    alignSelf: 'flex-end',
  },
  imageStyle: {
    width: '100%',
    maxWidth: '180px'
  },
  LikeButton: {
    fontSize: '20px',
  },
  CommentButton: {
    fontSize: '20px',
    margin: '5px',
  }
});

function Post({ category, reason, solve, status, rating, state, offender, likes, date, comments, id, offenderName, authorName }) {

  const classes = useStyles();

  const dispatch = useDispatch()
  const history = useHistory()

  const login = useSelector((state) => state.users)

  const handlerDelete = () => {
    dispatch(AC.deletePostThunk(id))
  }

  const handlerLike = () => {
    dispatch(AC.likePostThunk({ id, login }))
  }

  const handlerChatPrivat = () => {
    dispatch(AC.chatPrivatThunk(id))
    history.push(`/chat/${id}`)
    // console.log('сюда пришло');

  }

  const handlerComments = () => {
    history.push(`/lenta/${id}`)
  }

  let picture = imgShout

  return (
    <>
      <div style={{ display: 'none' }}>
        {category === 'Воспитательная' ? picture = imgFamily : null}
        {category === 'Финансовая' ? picture = imgMoney : null}
        {category === 'Бытовая' ? picture = imgHome : null}
      </div>
      <Card className={`
      ${rating === 1 ? classes.root1 : null} 
      ${rating === 2 ? classes.root2 : null} 
      ${rating === 3 ? classes.root3 : null}`}>
        <div className={classes.postImage}>
          <div>
            <CardContent>
              <div>
                {
                  authorName &&
                  <Typography variant="body1" color="textPrimary" component="p"><span className={style.colortext}>Обиженный:</span> {authorName}</Typography>
                }
                {
                  offenderName &&
                  <Typography variant="body1" color="textPrimary" component="p"><span className={style.colortext}>Обидчик:</span> {offenderName}</Typography>
                }
                <Typography variant="body1" color="textPrimary" component="p"><span className={style.colortext}>Причина:</span> {reason}</Typography>
                <Typography variant="body1" color="textPrimary" component="p"><span className={style.colortext}>Пути Решения:</span> {solve}</Typography>
              </div>
            </CardContent>
          </div>
          <div className={classes.imageStyle}>
            <CardMedia
              component="img"
              alt="Card"
              image={picture}
            />
          </div>
        </div>
        <CardActions>
          <div className={classes.buttons}>
            {
              date ?
                <Button size="large" className={classes.CommentButton} color="primary" onClick={handlerComments}>💬{' '}{comments.length}</Button> :
                null
            }
            <Button size="large" className={classes.LikeButton} color="primary" onClick={handlerLike}>{likes.includes(login) ? "❤️" : "🤍"}{' '}{likes.length}</Button>
            {offender ? <Button size="large" color="primary" onClick={handlerDelete}>Удалить</Button> : null}
            {state ? <Button  size="large" color="primary" onClick={handlerChatPrivat}>Обсудить в чате</Button> : null}
          </div>
        </CardActions>
      </Card>
    </>


  )
}

export default Post
