import React from 'react'
import {Provider} from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import glamorous from 'glamorous'

import {configureStore} from 'store'

import Login from '~components/login'
import Theater from '~components/theater'

const { Div } = glamorous

const store = configureStore()

const App = () => (
  <Provider store={store}>
  <Router>
    <Div width="100%" height="100%">
      <Route exact path="/" component={Login} />
      <Route path="/theater" component={Theater} />
    </Div>
  </Router>
  </Provider>
)

export default App
