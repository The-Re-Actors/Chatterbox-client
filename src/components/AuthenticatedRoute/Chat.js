import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import apiUrl from '../../apiConfig'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ScrollToBottom from 'react-scroll-to-bottom'

import './styles/chat.css'
import nudgeSound from './styles/nudge.mp3'
const displayPicture = 'http://2.bp.blogspot.com/_r1kMibaacEs/TLVQgzYP33I/AAAAAAAAJXk/j8T-F70lTQ8/s320/Windows+Live+Messenger+2011+v15.4.3502.922+FINAL+%28Espa%C3%B1ol%29.jpg'

// import { getUserProfile } from '../../api/routes'

// dev server
const socket = io(apiUrl, {
  withCredentials: true
})

function Chat ({ user }) {
  const [state, setState] = useState({ message: '', name: 'Guest' })
  const [chat, setChat] = useState([])
  const [textColor, setTextColor] = useState('#000000')

  useEffect(() => {
    if (user.userProfile[0]) {
      setState({ name: user.userProfile[0].username })
    }
  }, [])

  useEffect(() => {
    socket.on('message', ({ name, message }) => {
      setChat([...chat, { name, message }])
    })
  })

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }


  const handleColorChange = event => {
    setTextColor(event.target.value)
  }

  const handleNudge = () => {
    const window = document.body
    const { name } = state
    window.className = 'is-nudged'
    socket.emit('message', { name, message: 'has nudged' })
    playNudgeSound()
    setTimeout(() => {
      window.className = ''
    }, 1000)
  }

  const playNudgeSound = () => {
    const useSound = new Audio(nudgeSound)
    useSound.play()
  }

  const handleKeyPress = event => {

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
              <span style={{ fontWeight: 'bold' }}>{name}:</span> <span style={{ color: textColor }}>{message}</span>
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
            <div className='message-buttons-bar d-flex'>
              {/* <button className='message-buttons' title='Send an emoticon'>
  😊
              </button> */}

              <button
                className='message-buttons'
                id='nudge-button'
                title='Send a nudge'
                onClick={(e) => handleNudge(e)}>
  🥴
              </button>

              <Form.Control
                className='d-flex'
                type='color'
                id='text-color'
                title='Choose text color'
                name='color'
                onChange={(e) => handleColorChange(e)}
              />
            </div>
            <div>
              <Form onSubmit={onMessageSubmit}>
                <Form.Group controlId='message'>
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
