import apiUrl from '../apiConfig'
import axios from 'axios'

// Function to get user profile
export const getUserProfile = (user) => {
  return axios({
    url: apiUrl + '/profile/',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

// Function to create user profile
export const createProfile = (formData, user) => {
  return axios({
    url: apiUrl + '/profile/create',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      userProfile: {
        username: formData
      }
    }
  })
}

// Function to update user profile
export const updateProfile = (id, formData, user) => {
  return axios({
    url: apiUrl + `/profile/${id}`,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      userProfile: {
        username: formData
      },
      userId: user._id
    }
  })
}

// Function to delete user profile
export const deleteProfile = (id, user) => {
  return axios({
    url: apiUrl + `/profile/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
