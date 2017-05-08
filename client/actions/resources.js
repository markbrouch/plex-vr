import { createAction } from 'redux-actions'

import API from '~api'

export const RESOURCES = 'RESOURCES'

export const fetchResources = () => (dispatch, getState) => {
  const { uuid, userStore: { user: { authToken } } } = getState()
  return dispatch(
    createAction(RESOURCES, API.fetchResources)({ authToken, uuid })
  )
}
