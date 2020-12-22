import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import io from "socket.io-client";

import LightSpeed from 'react-reveal/LightSpeed';
import { useParams } from 'react-router-dom';




function ChatPrivat() {

  const [yourId, setYourId] = useState()
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const socket = useSelector(state => state.socket)

  // const socketRef = useRef()

  const {id}  = useParams()
  console.log(id)

  useEffect(() => {
    // socketRef.current = io.connect('/')

    // socketRef.current.on("your id", id => {
    //   setYourId(id);
    // })

    // socketRef.current.on("private message", (messages) => {
    //   console.log("массив смсок", messages);
    //   receivedMessages(messages)
    // })

    // socketRef.current.on(`${idOne}`, (message) => {
    //   console.log("одна смска", message);
    //   receivedMessage(message);
    // })

    




  }, [])

  const handleChange = (e) => {
    setMessage(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault()
    socket.emit("private message", message)
    setMessages('')
  }

  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   console.log('-----@@@ back', idOne);
  //   const messageObjectPrivate = {
  //     body: message,
  //     id: yourId,
  //     userId,
  //     idOne,
  //     authorId,
  //   };
  //   setMessage("");
  //   if (message !== "") {
  //     socketRef.current.emit("private message", messageObjectPrivate);
  //   }
  //   return
  // }

  // const receivedMessage = (message) => {
  //   setMessages(oldMsgs => [...oldMsgs, message]);
  // }
  // const receivedMessages = (messages) => {
  //   console.log('messages ::::::', messages);
  //   messages.map((el) => {
  //     setMessages(oldMsgs => [...oldMsgs, el]);
  //   })
  //   setMessages(messages => messages);
  // }




  return (
    <>
      {/* <h1>1111111111111111</h1> */}
      <section className="chat">
        {/* {messages.map((message, index) => {
          return (<div className={`${message.id === yourId ? 'myRow' : 'partnerRow'}`} key={index}><div className={`${message.id === yourId ? 'myMessage' : 'partnerMessage'}`}>{message.id === yourId ? (<LightSpeed left>{message.body}</LightSpeed>) : (<LightSpeed right>{message.body}</LightSpeed>)}</div></div>)
        })} */}
      </section>

      <form onSubmit={submitHandler} name="chatForm">
        <label>
          Сообщение:
          <input value={message} onChange={handleChange} placeholder="Say something..." name="message2" type="text" />
        </label>
        <button>Отправить</button>
      </form>
    </>
  )

}


export default ChatPrivat;

