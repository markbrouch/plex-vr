import { createAction } from 'redux-actions'

import API from '~api'

export const LOGIN = 'LOGIN'

export const createLogin = ({ username, password }) => (dispatch, getState) => {
  const { uuid } = getState()
  return dispatch(
    createAction(LOGIN, API.createLogin)({ username, password, uuid })
  )
}
