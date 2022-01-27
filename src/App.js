/* eslint-disable no-tabs */
import React, { useState, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import Chat from './components/AuthenticatedRoute/Chat'
import Profile from './components/AuthenticatedRoute/Profile'
import { StyledContainer } from './components/styles/Container.styled'
import Row from 'react-bootstrap/Row'

const App = () => {
  const [user, setUser] = useState(null)
  const [currentProfile, setCurrentProfile] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])

  const clearUser = () => setUser(null)

  const deleteAlert = id => {
    setMsgAlerts(msgAlerts.filter(msg => msg.id !== id))
  }

  const msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    setMsgAlerts([...msgAlerts, { heading, message, variant, id }])
  }

  return (
    <StyledContainer>
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert) => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={deleteAlert}
          />
        ))}
    
        <Route
          exact
          path='/'
          render={() => (
            <Fragment>
              <Row className='justify-content-center'>
                <SignIn msgAlert={msgAlert} setUser={setUser} />

                <SignUp msgAlert={msgAlert} setUser={setUser} />
              </Row>
            </Fragment>
          )}
        />

        <AuthenticatedRoute
          user={user}
          path='/sign-out'
          render={() => (
            <SignOut
              msgAlert={msgAlert}
              clearUser={clearUser}
              user={user}
            />
          )}
        />
        <AuthenticatedRoute
          user={user}
          path='/change-password'
          render={() => (
            <ChangePassword msgAlert={msgAlert} user={user} />
          )}
        />
        <AuthenticatedRoute
          user={user}
          path='/chat'
          render={() =>
            <Chat
              msgAlert={msgAlert}
              user={user}
              currentProfile={currentProfile}
              setCurrentProfile={setCurrentProfile}
            />
          }
        />
        <AuthenticatedRoute
          user={user}
          path='/profile'
          render={() => (
            <Profile
              msgAlert={msgAlert}
              user={user}
              setUser={setUser}
              currentProfile={currentProfile}
              setCurrentProfile={setCurrentProfile}
            />
          )}
        />
      </Fragment>
    </StyledContainer>
  )
}

export default App
