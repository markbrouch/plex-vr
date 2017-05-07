import { combineReducers } from 'redux'

import userStore from '~reducers/user'
import sectionsStore from '~reducers/sections'

const rootReducer = combineReducers({
  userStore,
  sectionsStore
})

export default rootReducer
