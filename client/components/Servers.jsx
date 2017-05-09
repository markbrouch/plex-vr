import React from 'react'
import { connect } from 'react-redux'

import { fetchResources, setServer } from '~actions/resources'

import Container from '~components/Container'

class Servers extends React.Component {
  constructor(props) {
    super(props)

    this.handleFetchResources = this.handleFetchResources.bind(this)
    this.handleSetServer = this.handleSetServer.bind(this)

    this.handleFetchResources()
  }

  handleFetchResources() {
    this.props.onFetchResources()
  }

  handleSetServer(serverId) {
    const { onSetServer, history } = this.props

    onSetServer(serverId)
    history.push('/library')
  }

  render() {
    const { servers } = this.props

    if (!servers) return <div>Loading...</div>

    return (
      <Container>
        <div className="card">
          <div className="card-block">
            <h4 className="card-title">Choose a server</h4>
          </div>
          {servers.map(({ clientIdentifier, name }) => (
            <button
              key={clientIdentifier}
              type="button"
              className="btn btn-link btn-lg btn-block"
              onClick={() => this.handleSetServer(clientIdentifier)}
            >
              {name}
            </button>
          ))}
        </div>
      </Container>
    )
  }
}

export default connect(
  ({ resourcesStore: { resources } }) => ({
    servers: resources &&
      resources.filter(resource =>
        resource.provides.split(',').includes('server')
      )
  }),
  dispatch => ({
    onFetchResources: () => dispatch(fetchResources()),
    onSetServer: serverId => dispatch(setServer(serverId))
  })
)(Servers)
