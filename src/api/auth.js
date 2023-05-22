// Importing dependencies and modules
import apiUrl from '../apiConfig'
import axios from 'axios'

// Function to sign up a user
export const signUp = (credentials) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/sign-up/',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation
      }
    }
  })
}

// Function to sign in a user
export const signIn = (credentials) => {
  return axios({
    url: apiUrl + '/sign-in/',
    method: 'POST',
    data: {
      credentials
    }
  })
}

// Function to sign out a user
export const signOut = (user) => {
  return axios({
    url: apiUrl + '/sign-out/',
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

// Function to change user password
export const changePassword = (passwords, user) => {
  return axios({
    url: apiUrl + '/change-password/',
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    }
  })
}
