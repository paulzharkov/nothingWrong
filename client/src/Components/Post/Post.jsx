import { useDispatch } from "react-redux"
import * as AC from '../../redux/creators/posts'

function Post({ category, reason, solve, status, rating, state, likes, date, comments, id }) {

  const dispatch = useDispatch()

  const handlerDelete = () => {
    dispatch(AC.deletePostThunk(id))
  }

  return (
    <div>
      <div>Категория: {category}</div>
      <div>Причина: {reason}</div>
      <div>Пути Решения: {solve}</div>
      <div>Статус: {status}</div>
      <div>Уровень: {rating}</div>
      <div>Формат: {state}</div>
      <div>Лайки: {likes.length}</div>
      <div>Дата создания: {date}</div>
      <div>Комментарии: {comments.length}</div>
      <button type="button" onClick={handlerDelete}>Удалить</button>
    </div>
  )
}

export default Post
