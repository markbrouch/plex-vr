import React from 'react'
import glamorous from 'glamorous'
import request from 'superagent'

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
    const { username, password } = this.state

    const req = request
      .post('https://plex.tv/users/sign_in.json')
      .type('form')
      .set({
        'X-Plex-Client-Identifier': '12345'
      })
      .send({
        'user[login]': username,
        'user[password]': password
      })

    req.then(({ body }) => console.log(body)).catch(err => console.log(err))

    event.preventDefault()
  }

  handleInputChange(event) {
    const { target } = event
    const { type, value, name } = target

    this.setState({
      [name]: type === 'checkbox' ? checked : value
    })
  }

  render() {
    const { username, password } = this.state

    return (
      <Container>
        <Panel className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-itle">Login</h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
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
              <div className="form-group">
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

export default Login
