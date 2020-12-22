import { useDispatch } from "react-redux"
import * as AC from '../../redux/creators/posts'
import { Link, useHistory } from 'react-router-dom'

function Post({ category, reason, solve, status, rating, state, offender, likes, date, comments, id, offenderName }) {

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



  return (
    <div>
      <div>Категория: {category}</div>
      <div>Причина: {reason}</div>
      <div>Пути Решения: {solve}</div>
      <div>Статус: {status}</div>
      <div>Уровень: {rating}</div>
      <div>Формат: {state}</div>
      <div>Обидчик: {offenderName}</div>
      <div>Лайки: {likes.length}</div>
      <div>Дата создания: {date}</div>
      <div>Комментарии: {comments.length}</div>
      <button type="button" onClick={(e) => {
        e.preventDefault();
        window.location.href = '/lenta/comment'; // id - history push
      }}>Комменты</button>
      {offender ?
        <>
          <button type="button" onClick={handlerDelete}>Удалить</button>

        </>
        : null}
      {state ?
        <Link to={`/chat/${id}`}>Обсудить Приватно</Link>
        : null}
    </div>
  )
}

export default Post
