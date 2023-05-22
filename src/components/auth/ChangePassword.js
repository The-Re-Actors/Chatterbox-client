import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import { changePassword } from '../../api/auth'
import {
  changePasswordSuccess,
  changePasswordFailure
} from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ChangePassword = ({ msgAlert, history, user }) => {
  // State variables for oldPassword and newPassword
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  // Event handler for input changes
  const handleChange = ({ target }) => {
    if (target.name === 'oldPassword') {
      setOldPassword(target.value)
    } else {
      setNewPassword(target.value)
    }
  }

  // Event handler for submitting the change password form
  const onChangePassword = (event) => {
    event.preventDefault()

    // Creating formData object with oldPassword and newPassword
    const formData = {
      oldPassword,
      newPassword
    }

    // Calling the changePassword API function
    changePassword(formData, user)
      .then(() => {
        // Resetting the input fields
        setOldPassword('')
        setNewPassword('')
      })
      .then(() =>
        msgAlert({
          heading: 'Change Password Success',
          message: changePasswordSuccess,
          variant: 'success'
        })
      )
      .catch((error) => {
        // Resetting the input fields
        setOldPassword('')
        setNewPassword('')
        msgAlert({
          heading: 'Change Password Failed with error: ' + error.message,
          message: changePasswordFailure,
          variant: 'danger'
        })
      })
  }

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Change Password</h3>
        <Form onSubmit={onChangePassword}>
          {/* Form inputs for old password */}
          <Form.Group controlId='oldPassword'>
            <Form.Label>Old password</Form.Label>
            <Form.Control
              required
              name='oldPassword'
              value={oldPassword}
              type='password'
              placeholder='Old Password'
              onChange={handleChange}
            />
          </Form.Group>

          {/* Form inputs for new password */}
          <Form.Group controlId='newPassword'>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              required
              name='newPassword'
              value={newPassword}
              type='password'
              placeholder='New Password'
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

export default withRouter(ChangePassword)
