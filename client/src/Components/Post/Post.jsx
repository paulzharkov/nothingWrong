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
import stiker from './1.jpeg'

const useStyles = makeStyles({
  root: {
    width: 375,
    display: 'flex',
    justifyContent: 'left',
  },
  buttons: {
    flexDirection: 'column',
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
  }

  const handlerComments = () => {
    history.push(`/lenta/${id}`)
  }

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Card image"
            width="140"
            image={stiker}
            title="Card image"
          />
          <CardContent>
          <Typography gutterBottom variant="subtitle1" component="h2">Категория: {category}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">Причина: {reason}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">Пути Решения: {solve}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">Статус: {status}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">Уровень: {rating}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">Обидчик: {offenderName}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">Дата создания: {date}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        <div>
          <Button className={classes.buttons} size="large" color="primary" onClick={handlerComments}>💬{comments.length}</Button>
          <Button className={classes.buttons} size="large" color="primary" onClick={(e) => {e.preventDefault();window.location.href = '/likes';}}>❤️️{likes.length}</Button>
          {offender ? <Button className={classes.buttons} size="large" color="primary" onClick={handlerDelete}>Удалить</Button> : null}
          {state ? <Button className={classes.buttons} size="large" color="primary" onClick={handlerChatPrivat}>Обсудить в чате</Button> : null}
          </div>
        </CardActions>
      </Card>
    </div>

  )
}

export default Post
