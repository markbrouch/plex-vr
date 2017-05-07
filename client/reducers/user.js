import { LOGIN } from '~actions/login'

const initialState = {
  isLoggedIn: false
}

const userStore = (state = initialState, action) => {
  const { type, payload: { user, error: errorMessage } = {}, error } = action

  switch (type) {
    case `${LOGIN}_REQUEST`:
      return state

    case `${LOGIN}_SUCCESS`:
      return {
        isLoggedIn: true,
        user
      }

    case `${LOGIN}_FAILURE`:
      return {
        isLoggedIn: false,
        error,
        errorMessage
      }

    default:
      return state
  }
}

export default userStore
