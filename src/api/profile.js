import apiUrl from '../apiConfig'
import axios from 'axios'

export const getUserProfile = (user) => {
  return axios({
    url: apiUrl + '/profile/',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

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

export const deleteProfile = (id, user) => {
  return axios({
    url: apiUrl + `/profile/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
