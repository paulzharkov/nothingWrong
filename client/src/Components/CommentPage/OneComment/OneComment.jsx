import style from '../index.module.css'

function OneComment({ id, text, author }) {
  return (
    <div>
      <h3><span className={style.colortext}>Автор:</span> {author}</h3>
      <p>{text}</p>
    </div>
  )
}

export default OneComment
