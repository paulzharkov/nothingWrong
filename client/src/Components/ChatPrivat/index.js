import React, { useState, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'
import LightSpeed from 'react-reveal/LightSpeed';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
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
  console.log('user',user)
  console.log('offenderName',wrong.offenderName)

  const RandomButton = withStyles(() => ({
    root: {
      alignItems: 'start',
      margin: '3px',
      color: '#FFF',
      border: '2px solid #67a3a3',
      fontSize: '14px',
      boxShadow: '3px 4px 5px #0000003b',
      fontWeight: 'bold',
      paddingTop: '10px',
      backgroundColor: '#67a3a3',
    },
  }))(Button);

  function stopMachine() {
    if(user !== wrong.offenderName) {
      socket.emit('stop machine', {
        title: `Вас устраивает как обидка решена?`,
        wrongID: id,
        offenderSocketID: socket.id
      })
      socket.emit('stop machine 2', {
        title: `Юзер ${user} хочет завершить обидку. Вы решили проблему?`,
        wrongID: id,
        offenderSocketID: socket.id
      })
  } else {
    socket.emit('stop machine', {
      title: `Юзер ${user} хочет завершить обидку. Вы решили проблему?`,
      wrongID: id,
      offenderSocketID: socket.id
    })
    socket.emit('stop machine 2', {
        title: `Вас устраивает как обидка решена?`,
        wrongID: id,
        offenderSocketID: socket.id
    })
  }
}


  return (
    <>
      <div className="chatPage">
        <section className="chatMessages">
          {messages.map((message, index) => {
            return (
              <div className={`${message.login === user ? 'myRow' : 'partnerRow'}`} key={index}>
                <div className={`${message.login === user ? 'myMessage' : 'partnerMessage'}`}>
                  {message.login === user ? (<LightSpeed left>{message.message}</LightSpeed>)
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
          <div>
          <RandomButton
            type="submit" variant="outlined" color="primary"
            endIcon={<Icon style={{ marginTop: '-6px' }}>send</Icon>}>
            Отправить!
        </RandomButton>
        {messages.length >= 10 ?
        <RandomButton
        onClick={stopMachine}
            type="submit" variant="outlined" color="secondary"
            endIcon={<Icon  style={{ marginTop: '-6px' }}>clear</Icon>}>
            Завершить
        </RandomButton> : null }
        </div>
        </form>
      </div>
    </>

  )

}

export default Chat;
