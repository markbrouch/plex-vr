import { RESOURCES } from '~actions/resources'

const initialState = {}

const resourcesStore = (state = initialState, action) => {
  const {
    type,
    payload: { resources, error: errorMessage } = {},
    error
  } = action

  switch (type) {
    case `${RESOURCES}_REQUEST`:
      return state

    case `${RESOURCES}_SUCCESS`:
      return {
        resources
      }

    case `${RESOURCES}_FAILURE`:
      return {
        error,
        errorMessage
      }

    default:
      return state
  }
}

export default resourcesStore
