/* eslint-disable no-tabs */

// Importing necessary dependencies and components
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

// App component
const App = () => {
  // State variables
  const [user, setUser] = useState(null)
  const [currentProfile, setCurrentProfile] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])

  // Function to clear the user state
  const clearUser = () => setUser(null)

  // Function to delete an alert by its ID
  const deleteAlert = (id) => {
    setMsgAlerts(msgAlerts.filter(msg => msg.id !== id))
  }

  // Function to add a new alert to the message alerts
  const msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    setMsgAlerts([...msgAlerts, { heading, message, variant, id }])
  }

  return (
    <StyledContainer>
      <Fragment>
        {/* Render the Header component */}
        <Header user={user} />

        {/* Render the AutoDismissAlert components for each message alert */}
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

        {/* Routes */}
        <Route
          exact
          path='/'
          render={() => (
            <Fragment>
              <Row className='justify-content-center'>
                {/* Render the SignIn component */}
                <SignIn msgAlert={msgAlert} setUser={setUser} />

                {/* Render the SignUp component */}
                <SignUp msgAlert={msgAlert} setUser={setUser} />
              </Row>
            </Fragment>
          )}
        />

        {/* Authenticated routes */}
        <AuthenticatedRoute
          user={user}
          path='/sign-out'
          render={() => (
            // Render the SignOut component
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
            // Render the ChangePassword component
            <ChangePassword msgAlert={msgAlert} user={user} />
          )}
        />
        <AuthenticatedRoute
          user={user}
          path='/chat'
          render={() => (
            // Render the Chat component
            <Chat
              msgAlert={msgAlert}
              user={user}
              currentProfile={currentProfile}
              setCurrentProfile={setCurrentProfile}
            />
          )}
        />
        <AuthenticatedRoute
          user={user}
          path='/profile'
          render={() => (
            // Render the Profile component
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

// Export the App component as the default export
export default App
