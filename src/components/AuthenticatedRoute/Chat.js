import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import apiUrl from '../../apiConfig'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ScrollToBottom from 'react-scroll-to-bottom'

import { getUserProfile } from '../../api/routes'

const socket = io('http://localhost:4741', {
  withCredentials: true
})

function Chat ({ user }) {
  const [state, setState] = useState({ message: '', name: 'Guest' })

  const [chat, setChat] = useState([])

  useEffect(() => {
    getUserProfile(user)
      .then((res) => {
        console.log(res)
        setState({ name: user.userProfile[0].username })
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    socket.on('message', ({ name, message }) => {
      setChat([...chat, { name, message }])
    })
  })

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      onMessageSubmit(event)
    }
  }

  const handleReset = (event) => {
    event.preventDefault()
    setState({ message: '' })
  }

  const onMessageSubmit = (event) => {
    event.preventDefault()
    const { name, message } = state
    socket.emit('message', { name, message })
    setState({ message: '', name })
  }

  const renderChat = () => {
    return (
      <ScrollToBottom className='message-scroll'>
        {chat.map(({ name, message }, index) => (
          <div key={index}>
            <h3>
              {name}: <span>{message}</span>
            </h3>
          </div>
        ))}
      </ScrollToBottom>
    )
  }

  return (
    <div>
      <div className='window'>
        <div className='bar'>
          <div className='top-bar'>
            <img
              className='logo'
              src='https://www.clipartmax.com/png/small/83-836045_msn-boneco-logo-vector-msn-messenger-logo-png.png'
            />
            <div className='contact'>
              <div className='username'>{state.name}</div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='item chat-box'>{renderChat()}</div>
          <div className='item img'>
            <div className='img-display-picture'>
              <img src={displayPicture} />
            </div>
          </div>
          <div className='item send-message'>
            <div className='message_buttons-bar'>
              {/* <button className='message-buttons' title='Send an emoticon'>
  😊
              </button>
              <button className='message-buttons' title='Send a wink'>
  😉
              </button>
              <button
                className='message-buttons'
                id='nudge-button'
                title='Send a nudge'>
  🥴
              </button>
              <button className='message-buttons' title='Change the font'>
  🔤
              </button>
              <button className='message-buttons' title='Change text color'>
  🎨
              </button> */}
            </div>
            <div>
              <Form onSubmit={onMessageSubmit}>
                <Form.Group controlId='message'>
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    as='textarea'
                    rows='4'
                    name='message'
                    value={state.message}
                    placeholder='Enter message'
                    className='message-box'
                    onChange={(e) => handleChange(e)}
                    onKeyPress={handleKeyPress}
                  />
                  <div className='message-submit col-2'>
                    <Button
                      className='message-submit-button'
                      variant='primary'
                      type='submit'>
                      <u>S</u>end
                    </Button>
                    <Button
                      className='message-clear-button'
                      variant='secondary'
                      onClick={handleReset}>
                      <u>C</u>lear
                    </Button>
                  </div>
                </Form.Group>
              </Form>
            </div>
            {/* <div className="sent-message-info">Last message received at 2:00 PM on 12/16/2006.</div> */}
          </div>
          <div className='item img'>
            <div className='img-display-picture'>
              <img src={displayPicture} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
