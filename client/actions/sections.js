import { createAction } from 'redux-actions'

import API from '~api'

export const SECTIONS = 'SECTIONS'

export const fetchSections = () => (dispatch, getState) => {
  const { uuid, userStore: { user: { authToken } } } = getState()
  return dispatch(
    createAction(SECTIONS, API.fetchSections)({ authToken, uuid })
  )
}
