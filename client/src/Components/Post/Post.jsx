import { useDispatch } from "react-redux"
import * as AC from '../../redux/creators/posts'
import { useHistory } from 'react-router-dom'

function Post({ category, reason, solve, status, rating, state, offender, likes, date, comments, id, offenderName }) {

  const dispatch = useDispatch()
  const history = useHistory()

  const handlerDelete = () => {
    dispatch(AC.deletePostThunk(id))
  }

  // const handlerChatPrivat = () => {

  //   // dispatch(AC.chatPrivatThunk(id))

  // }



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
        <button type="button" onClick={() => history.push('/chatprivate')}>Обсудить Приватно</button>
        : null}
    </div>
  )
}

export default Post
