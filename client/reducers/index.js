import { combineReducers } from 'redux'

import userStore from '~reducers/user'
import sectionsStore from '~reducers/sections'
import resourcesStore from '~reducers/resources'
import browser from '~reducers/browser'

const rootReducer = combineReducers({
  uuid: (state = {}) => state,
  userStore,
  sectionsStore,
  resourcesStore,
  browser
})

export default rootReducer
