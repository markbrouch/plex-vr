import { createAction } from 'redux-actions'

import API from '~api'

export const LOGIN = 'LOGIN'
export const SECTIONS = 'SECTIONS'

const createLogin = createAction(LOGIN, API.createLogin)
const fetchSections = createAction(SECTIONS, API.fetchSections)

export const login = ({ username, password }) => async (dispatch, getState) => {
  try {
    await dispatch(createLogin({ username, password }))

    const { userStore: { user: { authToken } } } = getState()

    await dispatch(fetchSections({ authToken }))
  } catch (error) {
    if (error.status) {
      console.log(`[${error.status}]: ${error.statusText}`, error)
    } else {
      throw error
    }
  }
}
