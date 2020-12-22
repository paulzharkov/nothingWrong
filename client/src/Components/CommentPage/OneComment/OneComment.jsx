function OneComment({ id, text, author }) {
  return (
    <div>
      <h3>Автор: {author}</h3>
      <p>{text}</p>
    </div>
  )
}

export default OneComment
