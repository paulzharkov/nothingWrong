import { useDispatch } from "react-redux"
import * as AC from '../../redux/creators/posts'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import sticker from './3.jpeg'

const useStyles = makeStyles({
  root: {
    // display: 'flex',
  },
  postImage: {
    display: 'flex',
    flexDirection: 'row',
    // width: '100px',
  },
  buttons: {
    display: 'flex',
    alignSelf: 'flex-end',
  },
  image: {
    width: '100%',
    maxWidth: '180px'
  }
});

function Post({ category, reason, solve, status, rating, state, offender, likes, date, comments, id, offenderName }) {

  const classes = useStyles();

  const dispatch = useDispatch()
  const history = useHistory()


  const handlerDelete = () => {
    dispatch(AC.deletePostThunk(id))
  }

  const handlerChatPrivat = () => {
    dispatch(AC.chatPrivatThunk(id))
    history.push('/chat')
    // console.log('сюда пришло');

  }

  const handlerComments = () => {
    history.push(`/lenta/${id}`)
  }

  return (
    <Card className={classes.root}>
      <div className={classes.postImage}>
      
        <div>
          <CardContent>
            <Typography gutterBottom variant="subtitle1" component="h2">Категория: {category}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">Причина: {reason}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">Пути Решения: {solve}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">Статус: {status}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">Уровень: {rating}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">Обидчик: {offenderName}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">Дата создания: {date}</Typography>
          </CardContent>
        </div>
        <div className={classes.image}>
        <CardMedia 
          component="img"
          alt="Card image"
          image={sticker}
          title="Card image"
        />
        </div>
      </div>
      <CardActions>
        <div className={classes.buttons}>
          <Button size="large" color="primary" onClick={handlerComments}>💬{comments.length}</Button>
          <Button size="large" color="primary" onClick={(e) => { e.preventDefault(); window.location.href = '/likes'; }}>❤️️{likes.length}</Button>
          {offender ? <Button size="large" color="primary" onClick={handlerDelete}>Удалить</Button> : null}
          {state ? <Button size="large" color="primary" onClick={handlerChatPrivat}>Обсудить в чате</Button> : null}
        </div>
      </CardActions>
    </Card>



  )
}

export default Post
