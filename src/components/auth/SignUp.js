import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import { signUpSuccess, signUpFailure } from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SignUp = ({ msgAlert, setUser, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  // Function to handle input changes in the form fields
  const handleChange = ({ target }) => {
    if (target.name === 'email') {
      setEmail(target.value)
    } else if (target.name === 'password') {
      setPassword(target.value)
    } else {
      setPasswordConfirmation(target.value)
    }
  }

  // Function called when the form is submitted
  const onSignUp = (event) => {
    event.preventDefault()

    const formData = {
      email,
      password,
      passwordConfirmation
    }

    // Call the signUp function to register a new user
    signUp(formData)
      .then(() => signIn(formData)) // Automatically sign in the newly registered user
      .then((res) => setUser(res.data.user)) // Set the user in the application state
      .then(() =>
        msgAlert({
          heading: 'Sign Up Success',
          message: signUpSuccess,
          variant: 'success'
        })
      )
      .then(() => history.push('/profile')) // Redirect the user to the profile page
      .catch((error) => {
        setEmail('')
        setPassword('')
        setPasswordConfirmation('')

        msgAlert({
          heading: 'Sign Up Failed with error: ' + error.message,
          message: signUpFailure,
          variant: 'danger'
        })
      })
  }

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Sign Up</h3>
        <Form onSubmit={onSignUp}>
          <Form.Group controlId='sign-up-email'>
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
          <Form.Group controlId='sign-up-password'>
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
          <Form.Group controlId='passwordConfirmation'>
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              required
              name='passwordConfirmation'
              value={passwordConfirmation}
              type='password'
              placeholder='Confirm Password'
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
						Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default withRouter(SignUp)
