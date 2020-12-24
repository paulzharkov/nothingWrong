import React, { useState, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'
import LightSpeed from 'react-reveal/LightSpeed';
import { useParams } from 'react-router-dom';
import { chatPrivatThunk } from '../../redux/creators/posts';
import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

function Chat() {

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { id } = useParams()
  const dispatch = useDispatch()
  const posts = useSelector((state) => state)
  const socket = useSelector(state => state.socket)
  console.log('posts', posts.socket.id);
  const ID = posts.socket.id

  useEffect(() => {
    dispatch(chatPrivatThunk(id))
    socket.on("private message", async (allMessages) => {
      hashMessege(allMessages)
    })
    return () => {
      dispatch(chatPrivatThunk())
    }
  }, [])

  function hashMessege(someMessage) {
    setMessages(oldMsgs => [...oldMsgs, someMessage])
  }

  const handleChange = (e) => {
    setMessage(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const messageObjectPrivate = {
      message: message,
      id: id,
      yourId: socket.id,
    }
    setMessage('')
    socket.emit('message notification', {
      title: 'Вам пришло сообщение!',
      wrongID: id,
      offenderSocketID: socket.id
    })
    socket.emit("message", messageObjectPrivate)
  }

  const RandomButton = withStyles(() => ({
    root: {
      backgroundColor: '#FFF',
      color: '#67a3a3',
      alignItems: 'start',
      border: '1px solid #d6d6d6',
    },
  }))(Button);

  return (
    <>
      <div className="chatPage">
        <section className="chatMessages">
          {messages.map((message, index) => {
            return (
              <div className={`${message.yourId === ID ? 'myRow' : 'partnerRow'}`} key={index}>
                <div className={`${message.yourId === ID ? 'myMessage' : 'partnerMessage'}`}>
                  {message.yourId === ID ? (<LightSpeed left>{message.message}</LightSpeed>)
                    : (<LightSpeed right>{message.message}</LightSpeed>)}</div>
              </div>
            )
          })}
        </section>

        <form onSubmit={submitHandler} name="chatForm" className="chatForm">
          <input style={{
            width: "80%",
            height: "50px",
            marginBottom: "10px",
            cursor: 'text',
            display: 'inline-flex',
            position: 'relative',
            fontSize: '1rem',
            alignItems: 'center',
            borderRadius: '4px',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: '400',
            lineHeight: '1.1876em',
            letterSpacing: '0.00938em',
            color: '#67a3a3',
            border: '1px solid #d6d6d6',
            padding: '0px 10px',
          }}
          value={message} required onChange={handleChange} name="message2" type="text" placeholder="Say something..."
          />
          <RandomButton
            type="submit" variant="outlined" color="primary"
            endIcon={<Icon>send</Icon>}>
            Отправить!
        </RandomButton>
        </form>
      </div>
    </>

  )

}

export default Chat;
