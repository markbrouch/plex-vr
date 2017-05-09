import { createAction } from 'redux-actions'

import API from '~api'

export const MEDIA_ITEMS = 'MEDIA_ITEMS'

export const fetchMediaItems = ({ serverUri, path }) => (
  dispatch,
  getState
) => {
  const { uuid, userStore: { user: { authToken } } } = getState()
  return dispatch(
    createAction(MEDIA_ITEMS, API.fetchMediaItems)({
      authToken,
      uuid,
      serverUri,
      path
    })
  )
}
