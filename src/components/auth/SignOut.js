import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import { signOut } from '../../api/auth'
import { signOutSuccess } from '../AutoDismissAlert/messages'

const SignOut = ({ msgAlert, user, clearUser, history }) => {
  useEffect(() => {
    // useEffect hook is used to perform side effects (sign out) on component mount

    signOut(user)
      .finally(() =>
        msgAlert({
          heading: 'Signed Out Successfully',
          message: signOutSuccess,
          variant: 'success'
        })
      )
      .finally(() => history.push('/')) // Redirect to the home page
      .finally(() => clearUser()) // Clear user data from the application state
  }, [])

  return '' // This component does not render any content, so an empty string is returned
}

export default withRouter(SignOut)
