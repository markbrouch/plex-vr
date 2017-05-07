import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import glamorous from 'glamorous'

import Linkify from 'react-linkify'

import { login } from '~actions/login'

const Container = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%'
})

const Panel = glamorous.div({
  width: '300px'
})

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    const { dispatch } = this.props
    const { username, password } = this.state

    dispatch(login({ username, password }))
  }

  handleInputChange(event) {
    const { target } = event
    const { type, value, name } = target

    this.setState({
      [name]: type === 'checkbox' ? checked : value
    })
  }

  render() {
    const { isAuthenticated, error, errorMessage, location } = this.props
    const { username, password } = this.state

    const { from } = location.state || { from: { pathname: '/' } }
    if (isAuthenticated) return <Redirect to={from} />

    return (
      <Container>
        <Panel className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-itle">Login</h3>
          </div>
          <div className="panel-body">
            {!!error &&
              <div className="alert alert-danger" role="alert">
                <Linkify properties={{ target: '_blank' }}>
                  {errorMessage}
                </Linkify>
              </div>}
            <form onSubmit={this.handleSubmit}>
              <div className="form-group form-group-lg">
                <label htmlFor="usernameInput">Username</label>
                <input
                  className="form-control"
                  id="usernameInput"
                  name="username"
                  placeholder="Username or Email"
                  value={username}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group form-group-lg">
                <label htmlFor="passwordInput">Password</label>
                <input
                  className="form-control"
                  type="password"
                  id="passwordInput"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-default">Sign In</button>
            </form>
          </div>
        </Panel>
      </Container>
    )
  }
}

export default connect(
  ({ userStore: { isAuthenticated, error, errorMessage } }) => ({
    isAuthenticated,
    error,
    errorMessage
  })
)(Login)
