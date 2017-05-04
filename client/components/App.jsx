import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from 'components/login'
import Theater from 'components/theater'

import styles from './App.css'

const App = () => (
  <Router>
    <div className={styles.App}>
      <Route exact path="/" component={Login} />
      <Route path="/theater" component={Theater} />
    </div>
  </Router>
)

export default App
