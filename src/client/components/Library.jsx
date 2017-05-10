import qs from 'qs'
import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'

import { fetchSections, fetchSection } from '~actions/sections'
import { fetchResources } from '~actions/resources'

class Library extends React.Component {
  constructor(props) {
    super(props)

    const { history, serverId, resources = [] } = props
    this.state = {
      server: resources.find(resource => resource.clientIdentifier === serverId)
    }

    this.handleFetchSections = this.handleFetchSections.bind(this)
    this.handleFetchSection = this.handleFetchSection.bind(this)
    this.handleClickItem = this.handleClickItem.bind(this)

    if (this.state.server) this.handleFetchSections()
  }

  handleFetchSections() {
    this.props.onFetchSections()
  }

  handleFetchSection({ sectionId, sectionName }) {
    this.setState({ sectionName })
    this.props.onFetchSection({ sectionId })
  }

  handleClickItem({ itemId }) {
    this.props.history.push(`/theater/${itemId}`)
  }

  render() {
    const { sections, items, authToken } = this.props
    const { location, server, sectionName } = this.state
    const serverUri =
      server &&
      server.connections.find(connection => connection.local === '0').uri

    if (!server) {
      return (
        <Redirect
          to={{
            pathname: '/servers',
            state: { from: location }
          }}
        />
      )
    }

    return (
      <div>
        <nav className="breadcrumb">
          <Link to="/servers" className="breadcrumb-item">{server.name}</Link>
          {!!sectionName && <a className="breadcrumb-item">{sectionName}</a>}
        </nav>
        {!sections
          ? <div>Loading...</div>
          : <div className="d-flex">
              <nav className="nav flex-column">
                {sections
                  .filter(section => section.type === 'movie')
                  .map(section => (
                    <a
                      href="#"
                      onClick={event => {
                        event.preventDefault()
                        this.handleFetchSection({
                          sectionId: section.key,
                          sectionName: section.title
                        })
                      }}
                      className="nav-link"
                      key={section.uuid}
                    >
                      {section.title}
                    </a>
                  ))}
              </nav>
              <div>
                {items.map(item => {
                  const params = qs.stringify({
                    width: 128,
                    height: 92,
                    minSize: 1,
                    url: item.thumb,
                    'X-Plex-Token': authToken
                  })
                  return (
                    <img
                      key={item.ratingKey}
                      src={`${serverUri}/photo/:/transcode?${params}`}
                      onClick={() =>
                        this.handleClickItem({ itemId: item.ratingKey })}
                    />
                  )
                })}
              </div>
            </div>}
      </div>
    )
  }
}

export default connect(
  ({
    library: { server: serverId, items = [] },
    userStore: { user: { authToken } },
    resourcesStore: { resources },
    sectionsStore: { sections }
  }) => ({
    authToken,
    serverId,
    items,
    resources,
    sections
  }),
  dispatch => ({
    onFetchSections: () => dispatch(fetchSections()),
    onFetchSection: ({ sectionId }) => dispatch(fetchSection({ sectionId }))
  })
)(Library)
