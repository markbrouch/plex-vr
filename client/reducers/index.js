import { combineReducers } from 'redux'

import userStore from '~reducers/user'
import sectionsStore from '~reducers/sections'
import resourcesStore from '~reducers/resources'
import library from '~reducers/library'

const rootReducer = combineReducers({
  uuid: (state = {}) => state,
  userStore,
  sectionsStore,
  resourcesStore,
  library
})

export default rootReducer
