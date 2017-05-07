import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import localForage from 'localForage'

import rootReducer from '~reducers'

const composeEnhancers = typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose

const middleware = [
  thunk,
  promiseMiddleware({
    promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']
  })
]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  autoRehydrate()
)

export const configureStore = initialState => {
  const store = createStore(rootReducer, initialState, enhancer)

  persistStore(store, { storage: localForage })

  if (module.hot) {
    module.hot.accept('~reducers', () => {
      const nextRootReducer = require('~reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
