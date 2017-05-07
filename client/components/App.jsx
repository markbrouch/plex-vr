import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import glamorous from 'glamorous'

import { PrivateRoute } from '~client/routes'

import Login from '~components/login'
import Library from '~components/library'
import Theater from '~components/theater'

const { Div } = glamorous

const App = () => (
  <Router>
    <Div width="100%" height="100%">
      <Route path="/login" component={Login} />
      <PrivateRoute path="/library" component={Library} />
      <PrivateRoute path="/theater" component={Theater} />
    </Div>
  </Router>
)

export default App
