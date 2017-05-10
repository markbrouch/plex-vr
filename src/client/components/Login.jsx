import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import classNames from 'classnames'

import Linkify from 'react-linkify'

import { createLogin } from '~actions/login'

import Container from '~components/Container'

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

    const { onSubmit } = this.props
    const { username, password } = this.state

    onSubmit({ username, password })
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

    const formGroupClasses = classNames('form-group form-group-lg', {
      'has-danger': error
    })

    return (
      <Container>
        <div className="card">
          <h3 className="card-header">Login</h3>
          <div className="card-block">
            <div className="card-text">
              {!!error &&
                <div className="alert alert-danger" role="alert">
                  <Linkify properties={{ target: '_blank' }}>
                    {errorMessage}
                  </Linkify>
                </div>}
              <form onSubmit={this.handleSubmit}>
                <div className={formGroupClasses}>
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
                <div className={formGroupClasses}>
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
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    )
  }
}

export default connect(
  ({ userStore: { isAuthenticated, error, errorMessage } }) => ({
    isAuthenticated,
    error,
    errorMessage
  }),
  dispatch => ({
    onSubmit: ({ username, password }) =>
      dispatch(createLogin({ username, password }))
  })
)(Login)
