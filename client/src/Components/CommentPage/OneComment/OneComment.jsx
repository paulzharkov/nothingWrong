function OneComment({ id, text, author }) {
  console.log(author);
  console.log(text);
  return (
    <div>
      <h3>Автор: {author}</h3>
      <p>{text}</p>
    </div>
  )
}

export default OneComment
