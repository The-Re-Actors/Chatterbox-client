import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { createProfile, deleteProfile, updateProfile } from '../../api/profile'
import { createProfileSuccess, createProfileFailure } from '../AutoDismissAlert/messages'

function Profile ({ msgAlert, user }) {
  const [userName, setUserName] = useState('')
  const [profileList, setProfileList] = useState(user.userProfile)

  console.log('proflist ', profileList)
  const onSubmitProfile = (event) => {
    event.preventDefault()

    createProfile(userName, user)
      .then(res => {
        console.log(res.data.userProfile)
        setProfileList(prev => [...prev, res.data.userProfile])
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

  const handleChange = ({ target }) => {
    setUserName(target.value)
  }

  const onUpdateProfile = ({ target }) => {
    console.log('id ', target.className.slice(0, 24))
    const id = target.className.slice(0, 24)
    updateProfile(id, userName, user)
      .then((res) => {
        console.log('update successful', res.data)
        const profileArray = profileList.filter(profile => profile._id !== id)
        profileArray.push(res.data.userProfile)
        setProfileList(profileArray)
      })
      .catch(console.error)
  }

  const onDeleteProfile = (event) => {
    console.log('id ', event.target.className.slice(0, 24))
    const id = event.target.className.slice(0, 24)
    deleteProfile(id, user)
      .then(() => {
        console.log('deletion successful')
        const profileArray = profileList.filter(profile => profile._id !== id)
        setProfileList(profileArray)
      })
      .catch(console.error)
  }

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
          <Button variant='primary' type='submit'>Submit</Button>
        </Form>
        <div>
          {renderProfiles()}
        </div>
      </div>
    </div>
  )
}

export default Profile
