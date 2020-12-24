import React, { useState, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import io from "socket.io-client";
import './index.css'
import LightSpeed from 'react-reveal/LightSpeed';
import { useParams } from 'react-router-dom';
import { chatPrivatThunk, getWrongThunk } from '../../redux/creators/posts';
import { allOurMessagesThunk, setAllMessages } from '../../redux/creators/messages';




function Chat() {

  const [message, setMessage] = useState("");
  const { id } = useParams()
  const user = useSelector(state => state.users)
  const dispatch = useDispatch()
  const socket = useSelector(state => state.socket)
  console.log('socket',socket)
  const messages = useSelector(state => state.messages)
  const wrong = useSelector(state => state.oneWrong)

  useEffect(() => {
    dispatch(getWrongThunk(id))
    dispatch(allOurMessagesThunk(id))
    dispatch(chatPrivatThunk(id))


    socket.on("private message", async (allMessages) => {
      dispatch(setAllMessages(allMessages))
    })


    return () => {
      dispatch(chatPrivatThunk())
      dispatch(setAllMessages([]))
    }
  }, [])



  const handleChange = (e) => {
    setMessage(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const messageObjectPrivate = {
      message: message,
      id: id,
      login: user
    }
    setMessage('')
    socket.emit('message notification', {
      title: 'Вам пришло сообщение!',
      wrongID: id,
      offenderSocketID: socket.id
    })
    socket.emit("message", messageObjectPrivate)

  }
  console.log(messages)
  console.log('wrong',wrong)


  return (
    <>
      <section className="chat">
        {messages.map((message, index) => {
          
          return (<div className={`${message.login === user ? 'myRow' : 'partnerRow'}`} key={index}><div className={`${message.login === user ? 'myMessage' : 'partnerMessage'}`}>{message.login === user ? (<LightSpeed left>{message.message}</LightSpeed>) : (<LightSpeed right>{message.message}</LightSpeed>)}</div></div>)
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

//  {/* <>
//         {/* <h1>1111111111111111</h1> */}
//         {/* <section className="chat">
//           {messages.map((message, index) => {
//             return (<div className={`${message.id === yourId ? 'myRow' : 'partnerRow'}`} key={index}><div className={`${message.id === yourId ? 'myMessage' : 'partnerMessage'}`}>{message.id === yourId ? (<LightSpeed left>{message.body}</LightSpeed>) : (<LightSpeed right>{message.body}</LightSpeed>)}</div></div>)
//           })}
//         </section> */}
//         {/* <section className="chat">
//           {messages.map((message, index) => {
//             return (

//             <div>
//               {message.message}
//             </div>
//             )
//           })}
//         </section>

//         <form onSubmit={submitHandler} name="chatForm">
//           <label>
//             Сообщение:
//             <input value={message} onChange={handleChange} placeholder="Say something..." name="message2" type="text" />
//           </label>
//           <button>Отправить</button>
//         </form>
//       </> */} */}
// {/* <section className="chat">
//         {messages.map((message, index) => {
//           return (<div className={`${message.id === yourID ? 'myRow' : 'partnerRow'}`} key={index}><div className={`${message.id === yourID ? 'myMessage' : 'partnerMessage'}`}>{message.id === yourID ? (<LightSpeed left>{message.message}</LightSpeed>) : (<LightSpeed right>{message.message}</LightSpeed>)}</div></div>)
//         })}
//       </section>

//       <form onSubmit={submitHandler} name="chatForm">
//         <label>
//           Сообщение:
//           <input value={message} onChange={handleChange} placeholder="Say something..." name="message2" type="text" />
//         </label>
//         <button>Отправить</button>
//       </form> */}
