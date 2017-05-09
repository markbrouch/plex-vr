import { MEDIA_ITEMS } from '~actions/media-items'

const initialState = {}

const browser = (state = initialState, action) => {
  const {
    type,
    payload: { mediaItems, error: errorMessage } = {},
    error
  } = action

  switch (type) {
    case `${MEDIA_ITEMS}_REQUEST`:
      return state

    case `${MEDIA_ITEMS}_SUCCESS`:
      return {
        mediaItems
      }

    case `${MEDIA_ITEMS}_FAILURE`:
      return {
        error,
        errorMessage
      }

    default:
      return state
  }
}

export default browser
