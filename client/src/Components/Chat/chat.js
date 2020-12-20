import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import '../Chat/index.css';
import io from "socket.io-client";

import LightSpeed from 'react-reveal/LightSpeed';



function Chat() {
  const [yourId, setYourId] = useState()
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  // const user = useSelector((state) => state)
  const posts = useSelector((state) => state.posts)
  // console.log('posts: ---->>>',posts);

  const socketRef = useRef()
console.log(socketRef);
  useEffect(() => {
    socketRef.current = io.connect('/')

    socketRef.current.on("your id", id => {
      // console.log('-------->>>', id)
      setYourId(id);
    })

    socketRef.current.on("message", (message) => {
      console.log("here", message);
      receivedMessage(message);
    })
    // socketRef.current.on("private message", (message) => {
    //   console.log("here2", message);
    //   receivedMessage(message);
    // })
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
    // const messageObjectPrivate = {
    //   body: message,
    //   id: yourId,
    //   id2: 9999999,
    //   user,
    // };
    setMessage("");
    if (message !== "") {
      socketRef.current.emit("send message", messageObject);
      

        // socketRef.current.emit("private message", messageObjectPrivate);
    }
    return
  }

  const receivedMessage = (message) => {
      setMessages(oldMsgs => [...oldMsgs, message]);
  }
 



  return (
    <>
      <section className="chat">
        {messages.map((message, index) => {
          return (<div className={`${message.id === yourId ? 'myRow' : 'partnerRow'}`} key={index}><div className={`${message.id === yourId ? 'myMessage' : 'partnerMessage'}`}>{message.id === yourId ? (<LightSpeed left>{message.body}</LightSpeed>) : (<LightSpeed right>{message.body}</LightSpeed>)}</div></div>)
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

