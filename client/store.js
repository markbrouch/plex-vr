import { createStore, applyMiddleware, compose } from 'redux'
import { autoRehydrate, getStoredState, createPersistor } from 'redux-persist'
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
  autoRehydrate({
    log: process.env.NODE_ENV !== 'production'
  })
)

const rehydrateState = (config = {}) =>
  new Promise((resolve, reject) => {
    getStoredState(config, (err, restoredState) => {
      if (err) reject(err)
      resolve(restoredState)
    })
  })

export const configureStore = async initialState => {
  const persistConfig = { storage: localForage }
  const restoredState = await rehydrateState(persistConfig)
  const store = createStore(
    rootReducer,
    { ...restoredState, ...initialState },
    enhancer
  )

  const persistor = createPersistor(store, persistConfig)
  if (typeof window === 'object') window.__REDUX_PERSISTOR__ = persistor

  if (module.hot) {
    module.hot.accept('~reducers', () => {
      const nextRootReducer = require('~reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
