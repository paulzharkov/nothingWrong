function Chat () {
  return (
    <>
    <section className="chat">
      <div className="message">
        <img src="" alt="ava"/>
        <div className="text">Сообщение1</div>
      </div>
      <div className="message">
        <img src="" alt="ava"/>
        <div className="text">Сообщение2</div>
      </div>
    </section>

    <form name="chatForm">
<label>
  Сообщение:
  <input name="message" type="text"/>
</label>
<button>Отправить</button>
    </form>
    </>
  )

}


export default Chat;
