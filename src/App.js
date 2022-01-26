/* eslint-disable no-tabs */
import React, { Component, Fragment } from 'react'
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

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = id => {
    this.setState(state => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState(state => {
      return {
        msgAlerts: [...state.msgAlerts, { heading, message, variant, id }]
      }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

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
              deleteAlert={this.deleteAlert}
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
              <Fragment className='justify-content-center'>
                <Row >
                  {/* <Col md='12'> */}
                  <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
                  {/* </Col>
                  <Col md='12'> */}
                  <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
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
                msgAlert={this.msgAlert}
                clearUser={this.clearUser}
                user={user}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/change-password'
            render={() => (
              <ChangePassword msgAlert={this.msgAlert} user={user} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/chat'
            render={() => <Chat msgAlert={this.msgAlert} user={user} />}
          />
          <AuthenticatedRoute
            user={user}
            path='/profile'
            render={() => <Profile msgAlert={this.msgAlert} user={user} />}
          />
          {/* </main> */}
        </Fragment>
      </StyledContainer>
    )
  }
}

export default App
