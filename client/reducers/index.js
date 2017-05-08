import { combineReducers } from 'redux'

import userStore from '~reducers/user'
import sectionsStore from '~reducers/sections'

const rootReducer = combineReducers({
  uuid: (state = {}) => state,
  userStore,
  sectionsStore
})

export default rootReducer
