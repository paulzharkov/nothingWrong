import React, { useState, useEffect, useRef } from 'react';
import '../Chat/index.css';
import io from "socket.io-client";



function Chat() {
  const [yourId, setYourId] = useState()
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const socketRef = useRef()

  useEffect(() => {
    socketRef.current = io.connect('/')

    socketRef.current.on("your id", id => {
      // console.log('-------->>>', id)
      setYourId(id);
    })

    socketRef.current.on("message", (message) => {
      // console.log("here");
      receivedMessage(message);
    })
  }, [])

  const handleChange = (e) => {
    setMessage(e.target.value);
  }

  const sendMessage = (e) => {
    e.preventDefault();
    const messageObject = {
      body: message,
      id: yourId,
    };
    setMessage("");
    socketRef.current.emit("send message", messageObject);
  }

  const receivedMessage = (message) => {
    setMessages(oldMsgs => [...oldMsgs, message]);
  }




  return (
    <>
      <section className="chat">
        {messages.map((message, index) => {
          return (<div className={`${message.id === yourId ? 'myRow' : 'partnerRow'}`} key={index}><div className={`${message.id === yourId ? 'myMessage' : 'partnerMessage'}`}>{message.body}</div></div>)
        })}
      </section>

      <form onSubmit={sendMessage} name="chatForm">
        <label>
          Сообщение:
          <input value={message} onChange={handleChange} placeholder="Say something..." name="message2" type="text" />
        </label>
        <button>Отправить</button>
      </form>
    </>
  )

}


export default Chat;

