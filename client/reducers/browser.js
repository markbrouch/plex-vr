import { MEDIA_ITEMS } from '~actions/media-items'
import { SET_SERVER } from '~actions/resources'

const initialState = {}

const browser = (state = initialState, action) => {
  const { type, payload = {}, error } = action

  switch (type) {
    case `${MEDIA_ITEMS}_REQUEST`:
      return state

    case `${MEDIA_ITEMS}_SUCCESS`:
      return {
        mediaItems: payload.mediaItems
      }

    case `${MEDIA_ITEMS}_FAILURE`:
      return {
        error: payload.error,
        errorMessage: payload.errorMessage
      }

    case SET_SERVER:
      return {
        server: payload
      }

    default:
      return state
  }
}

export default browser
