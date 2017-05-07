import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { AppContainer } from 'react-hot-loader'

import { configureStore } from 'store'

import App from '~components/App'

const store = configureStore()

const render = async Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={await store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('~components/App', () => {
    render(App)
  })
}
