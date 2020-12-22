import { useDispatch } from "react-redux"
import * as AC from '../../redux/creators/posts'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
  },
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
    history.push('/chatprivate')
  }

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          {/* <CardMedia
            component="img"
            alt="Card image"
            width="140"
            // image="/static/images/cards/contemplative-reptile.jpg"
            title="Card image"
          /> */}
          <CardContent>
          <Typography gutterBottom variant="subtitle1" component="h2">Категория: {category}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">Причина: {reason}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">Пути Решения: {solve}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">Статус: {status}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">Уровень: {rating}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">Обидчик: {offenderName}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">Дата создания: {date}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">Комментарии: {comments.length}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={(e) => {e.preventDefault();window.location.href = '/lenta/comment';}}>💬{comments.length}</Button>
          <Button size="small" color="primary" onClick={(e) => {e.preventDefault();window.location.href = '/likes';}}>❤️️{likes.length}</Button>
          {offender ? <Button size="small" color="primary" onClick={handlerDelete}>Удалить</Button> : null}
          {state ? <Button size="small" color="primary" onClick={handlerChatPrivat}>Обсудить в чате</Button> : null}
        </CardActions>
      </Card>
    </div>

  )
}

export default Post
