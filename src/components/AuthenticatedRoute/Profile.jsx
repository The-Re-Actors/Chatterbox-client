import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { createProfile, deleteProfile, updateProfile } from '../../api/profile'
import {
  createProfileSuccess,
  createProfileFailure,
  updateProfileSuccess,
  updateProfileFailure,
  deleteProfileSuccess,
  deleteProfileFailure
} from '../AutoDismissAlert/messages'

function Profile ({ msgAlert, setUser, user, currentProfile, setCurrentProfile }) {
  const [userName, setUserName] = useState('')
  const [profileList, setProfileList] = useState(user.userProfile)

  // Set the current profile when the component mounts
  useEffect(() => {
    if (profileList[0]) {
      setCurrentProfile(profileList[0])
    }
  }, [])

  // Handle changes in the input field
  const handleChange = ({ target }) => {
    setUserName(target.value)
  }

  // Submit a new profile
  const onSubmitProfile = (event) => {
    event.preventDefault()

    createProfile(userName, user)
      .then(res => {
        setProfileList(prev => [...prev, res.data.userProfile])
        setUserName('')
      })
      .then(() =>
        msgAlert({
          heading: 'Username Created Successfully',
          message: createProfileSuccess,
          variant: 'success'
        }))
      .catch(error => {
        setUserName('')
        msgAlert({
          heading: 'Username Creation Failed with error: ' + error.message,
          message: createProfileFailure,
          variant: 'danger'
        })
      })
  }

  // Update a profile
  const onUpdateProfile = ({ target }) => {
    const id = target.className.slice(0, 24)
    updateProfile(id, userName, user)
      .then((res) => {
        setUser(res.data.user)
        setProfileList(res.data.user.userProfile)
        setUserName('')
      })
      .then(() =>
        msgAlert({
          heading: 'Profile Updated Successfully',
          message: updateProfileSuccess,
          variant: 'success'
        })
      )
      .catch(error =>
        msgAlert({
          heading: 'Profile Update Failed with error: ' + error.message,
          message: updateProfileFailure,
          variant: 'danger'
        })
      )
  }

  // Delete a profile
  const onDeleteProfile = (event) => {
    const id = event.target.className.slice(0, 24)
    deleteProfile(id, user)
      .then(() => {
        const profileArray = profileList.filter(profile => profile._id !== id)
        setProfileList(profileArray)
      })
      .then(() =>
        msgAlert({
          heading: 'Profile Deleted Successfully',
          message: deleteProfileSuccess,
          variant: 'success'
        })
      )
      .catch(error =>
        msgAlert({
          heading: 'Profile Deletion Failed with error: ' + error.message,
          message: deleteProfileFailure,
          variant: 'danger'
        })
      )
  }

  // Render the profile list
  const renderProfiles = () => {
    return profileList.map(({ username, _id }, index) => (
      <div key={index}>
        <h3>
          {username}
        </h3>
        <Button className={_id} variant='secondary' type='button' onClick={onUpdateProfile}>Update</Button>
        <Button className={_id} variant='danger' type='button' onClick={onDeleteProfile}>Delete</Button>
      </div>
    ))
  }

  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
        <h3>Profile</h3>
        <Form onSubmit={onSubmitProfile}>
          <Form.Group controlId='email'>
            <Form.Label>UserName</Form.Label>
            <Form.Control
              required
              type='text'
              name='username'
              value={userName}
              placeholder='Enter UserName'
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>Create</Button>
        </Form>
        <div>
          {renderProfiles()}
        </div>
      </div>
    </div>
  )
}

export default Profile
