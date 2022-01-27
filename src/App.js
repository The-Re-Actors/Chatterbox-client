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
// import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'

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
        {/* <main className='container'> */}
        {/* test to merge sign in sign up on landing page */}
        {/* <Route
            path='/'
            element={<SignIn msgAlert={this.msgAlert} />}
          /> */}
        <Route
          exact
          path='/'
          render={() => (
            <Fragment>
              <Row className='justify-content-center'>
                {/* <Col md='12'> */}
                <SignIn msgAlert={msgAlert} setUser={setUser} />
                {/* </Col>
                <Col md='12'> */}
                <SignUp msgAlert={msgAlert} setUser={setUser} />
                {/* </Col> */}
              </Row>
            </Fragment>
          )}
        />

        {/* end of test section  */}
        {/* <Route
            path='/sign-up'
            render={() => (
              <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
            )}
          />
          <Route
            path='/sign-in'
            render={() => (
              <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
            )}
          /> */}
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
        {/* </main> */}
      </Fragment>
    </StyledContainer>
  )
}

export default App
