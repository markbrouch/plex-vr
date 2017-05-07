import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import glamorous from 'glamorous'

import { PrivateRoute } from '~client/routes'

import Login from '~components/login'
import Library from '~components/library'
import Theater from '~components/theater'

const { Div } = glamorous

const App = ({ isAuthenticated }) => (
  <Router>
    <Div width="100%" height="100%">
      <Route path="/login" component={Login} />
      <PrivateRoute
        isAuthenticated={isAuthenticated}
        path="/library"
        component={Library}
      />
      <PrivateRoute
        isAuthenticated={isAuthenticated}
        path="/theater"
        component={Theater}
      />
    </Div>
  </Router>
)

export default connect(({ userStore: { isAuthenticated } }) => ({
  isAuthenticated
}))(App)
