import { combineReducers } from 'redux'

import userStore from '~reducers/user'
import sectionsStore from '~reducers/sections'
import resourcesStore from '~reducers/resources'

const rootReducer = combineReducers({
  uuid: (state = {}) => state,
  userStore,
  sectionsStore,
  resourcesStore
})

export default rootReducer
