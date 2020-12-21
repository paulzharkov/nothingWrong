import { useDispatch } from "react-redux"
import * as AC from '../../redux/creators/posts'
import { useHistory } from 'react-router-dom'

function Post({ category, reason, solve, status, rating, state, likes, date, comments, id, offender }) {

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
      {/* <div>Обидчик: {offenderName.login}</div> */}
      <div>Причина: {reason}</div>
      <div>Пути Решения: {solve}</div>
      <div>Статус: {status}</div>
      <div>Уровень: {rating}</div>
      <div>Формат: {state}</div>
      <div>Лайки: {likes.length}</div>
      <div>Дата создания: {date}</div>
      <div>Комментарии: {comments.length}</div>
      <button type="button" onClick={handlerDelete}>Удалить</button>
      <button type="button" onClick={handlerChatPrivat}>ОбсудитьПриватно</button>
    </div>
  )
}

export default Post
