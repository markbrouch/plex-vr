import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import glamorous from 'glamorous'

import Login from '~components/login'
import Theater from '~components/theater'

const { Div } = glamorous

const App = () => (
  <Router>
    <Div width="100%" height="100%">
      <Route exact path="/" component={Login} />
      <Route path="/theater" component={Theater} />
    </Div>
  </Router>
)

export default App
