import { SECTION } from '~actions/sections'
import { SET_SERVER } from '~actions/resources'

const initialState = {}

const library = (state = initialState, action) => {
  const { type, payload = {}, error } = action

  switch (type) {
    case `${SECTION}_REQUEST`:
      return state

    case `${SECTION}_SUCCESS`:
      return {
        ...state,
        items: payload.section
      }

    case `${SECTION}_FAILURE`:
      return {
        ...state,
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

export default library
