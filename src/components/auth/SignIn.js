import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../../api/auth'
import { signInSuccess, signInFailure } from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SignIn = ({ msgAlert, setUser, history }) => {
  // State variables for email and password
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Event handler for input changes
  const handleChange = ({ target }) => {
    if (target.name === 'email') {
      setEmail(target.value)
    } else {
      setPassword(target.value)
    }
  }

  // Event handler for submitting the sign in form
  const onSignIn = (event) => {
    event.preventDefault()

    // Creating formData object with email and password
    const formData = {
      email,
      password
    }

    // Calling the signIn API function
    signIn(formData)
      .then((res) => {
        // Set the user in the application state
        setUser(res.data.user)
      })
      .then(() =>
        msgAlert({
          heading: 'Sign In Success',
          message: signInSuccess,
          variant: 'success'
        })
      )
      .then(() => history.push('/chat'))
      .catch((error) => {
        // Reset the input fields
        setEmail('')
        setPassword('')
        msgAlert({
          heading: 'Sign In Failed with error: ' + error.message,
          message: signInFailure,
          variant: 'danger'
        })
      })
  }

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Sign In</h3>
        <Form onSubmit={onSignIn}>
          {/* Form inputs for email */}
          <Form.Group controlId='sign-in-email'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type='email'
              name='email'
              value={email}
              placeholder='Enter email'
              onChange={handleChange}
            />
          </Form.Group>

          {/* Form inputs for password */}
          <Form.Group controlId='sign-in-password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              name='password'
              value={password}
              type='password'
              placeholder='Password'
              onChange={handleChange}
            />
          </Form.Group>

          {/* Submit button */}
          <Button variant='primary' type='submit'>
						Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default withRouter(SignIn)
