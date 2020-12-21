import { useDispatch } from "react-redux"
import * as AC from '../../redux/creators/posts'
import { useHistory } from 'react-router-dom'

function Post({ category, reason, solve, status, rating, state, likes, date, comments, id, offender, offenderName }) {

  console.log(id)
  console.log(offender)

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
      <div>Категория: {category}</div>
      <div>Обидчик: {offenderName}</div>
      <div>Причина: {reason}</div>
      <div>Пути Решения: {solve}</div>
      <div>Статус: {status}</div>
      <div>Уровень: {rating}</div>
      <div>Формат: {state}</div>
      <div>Лайки: {likes.length}</div>
      <div>Дата создания: {date}</div>
      <div>Комментарии: {comments.length}</div>
      {offender ?
        <button type="button" onClick={handlerDelete}>Удалить</button>
        : null}
      <button type="button" onClick={handlerChatPrivat}>ОбсудитьПриватно</button>
    </div>
  )
}

export default Post
