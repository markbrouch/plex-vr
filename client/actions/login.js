import { createAction } from 'redux-actions'

import qs from 'qs'

const LOGIN = 'LOGIN'

const fetchLogin = async ({ username, password }) => {
  try {
    const formData = qs.stringify({
      'user[login]': username,
      'user[password]': password
    })

    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Plex-Client-Identifier': '12345'
    })

    const response = await fetch('https://plex.tv/users/sign_in.json', {
      method: 'POST',
      headers,
      body: formData
    })

    if (!response.ok) {
      const { status, statusText } = response
      const { error } = await response.json()

      return Promise.reject({
        status,
        statusText,
        error
      })
    }

    return response.json()
  } catch (error) {
    throw error.message
  }
}

export const createLogin = createAction(LOGIN, fetchLogin)
