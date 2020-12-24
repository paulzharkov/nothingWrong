import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { chatPrivatThunk } from '../../redux/creators/posts';
import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { id } = useParams()

  const dispatch = useDispatch()
  const socket = useSelector(state => state.socket)

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
      id: id
    }
    setMessage('')
    socket.emit('message notification', {
      title: 'Вам пришло сообщение!',
      wrongID: id,
      offenderSocketID: socket.id
    })
    socket.emit("message", messageObjectPrivate)
  }

  console.log('-------->>>', id)
  console.log(messages)

  const RandomButton = withStyles(() => ({
    root: {
      backgroundColor: '#FFF',
      color: '#67a3a3',
    },
  }))(Button);


  return (
    <>
      <div>
        <form onSubmit={submitHandler} name="chatForm" className='chatForm'>
            <TextField
              size='medium'
              value={message}
              onChange={handleChange}
              label="Введите сообщение"
              type="text"
              required
            />
            <RandomButton type="submit" variant="outlined" >
              Отправить
        </RandomButton>
        </form>
        <div>
          <section className="chat">
            {messages.map((message, index) => {
              return (
                <div>
                  {message.message}
                </div>
              )
            })}
          </section>
        </div>
      </div>
    </>
  )

}


export default Chat;

