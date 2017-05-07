import { SECTIONS } from '~actions/login'

const initialState = {}

const sectionsStore = (state = initialState, action) => {
  const {
    type,
    payload: { sections, error: errorMessage } = {},
    error
  } = action

  switch (type) {
    case `${SECTIONS}_REQUEST`:
      return state

    case `${SECTIONS}_SUCCESS`:
      return {
        sections
      }

    case `${SECTIONS}_FAILURE`:
      return {
        error,
        errorMessage
      }

    default:
      return state
  }
}

export default sectionsStore
