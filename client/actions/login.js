import { createAction } from 'redux-actions'

import API from '~api'

export const LOGIN = 'LOGIN'

export const createLogin = createAction(LOGIN, API.createLogin)

export const login = () => dispatch => {
  return createLogin
}
