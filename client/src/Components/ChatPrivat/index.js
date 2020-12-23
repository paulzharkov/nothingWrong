import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client";

import LightSpeed from 'react-reveal/LightSpeed';
import { useParams } from 'react-router-dom';
import { chatPrivatThunk } from '../../redux/creators/posts';




function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const {id} = useParams()

  const dispatch = useDispatch()
  // const posts = useSelector((state) => state)
  const socket = useSelector(state => state.socket)
  // const idOne = useSelector((state) => state.idOne)
  // console.log('id: ---->>>', id);


   useEffect(() => {

    dispatch(chatPrivatThunk(id))

    socket.on("private message", async (allMessages) => {
       hashMessege(allMessages)
    })


    return () => {
      dispatch(chatPrivatThunk())
    }
   }, [])


    // socketRef.current.on("private message", (message) => {
    //   console.log("here2", message);
    //   receivedMessage(message);
    // })




    // // socketRef.current.on(`${idOne}`, (message) => {
    // //   console.log("here2", message);
    // //   receivedMessage(message);
    // })





  // const handleChange = (e) => {
  //   setMessage(e.target.value);
  // }

  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   console.log('-----@@@ back', idOne);
  //   const messageObjectPrivate = {
  //     body: message,
  //     id: yourId,
  //     user,
  //     idOne,
  //     offenderId: 'sasha',
  //   };
  //   setMessage("");
  //   if (message !== "") {



  //     socketRef.current.emit("private message", messageObjectPrivate);
  //   }
  //   return
  // }

  function hashMessege(someMessage) {
    setMessages( oldMsgs => [...oldMsgs, someMessage])
  }

  const handleChange = (e) => {
    setMessage(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const messageObjectPrivate = {
      message: message,
      id: id
    }
    setMessage('')
    socket.emit('message notification', {
      title: 'Вам пришло сообщение!',
      wrongID: id,
      offenderSocketID: socket.id
    })
    socket.emit("message", messageObjectPrivate )

  }

  console.log('-------->>>', id)


  return (
    // <>
    //   <section className="chat">
    //     {messages.map((message, index) => {
    //       return (<div className={`${message.id === yourId ? 'myRow' : 'partnerRow'}`} key={index}><div className={`${message.id === yourId ? 'myMessage' : 'partnerMessage'}`}>{message.id === yourId ? (<LightSpeed left>{message.body}</LightSpeed>) : (<LightSpeed right>{message.body}</LightSpeed>)}</div></div>)
    //     })}
    //   </section>

    //   <form onSubmit={sendMessage} name="chatForm">
    //     <label>
    //       Сообщение:
    //       <input value={message} onChange={handleChange} placeholder="Say something..." name="message2" type="text" />
    //     </label>
    //     <button>Отправить</button>
    //   </form>
    // </>
      <>
        {/* <h1>1111111111111111</h1> */}
        {/* <section className="chat">
          {messages.map((message, index) => {
            return (<div className={`${message.id === yourId ? 'myRow' : 'partnerRow'}`} key={index}><div className={`${message.id === yourId ? 'myMessage' : 'partnerMessage'}`}>{message.id === yourId ? (<LightSpeed left>{message.body}</LightSpeed>) : (<LightSpeed right>{message.body}</LightSpeed>)}</div></div>)
          })}
        </section> */}
        <section className="chat">
          {messages.map((message, index) => {
            return (

            <div>
              {message.message}
            </div>
            )
          })}
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


export default Chat;

