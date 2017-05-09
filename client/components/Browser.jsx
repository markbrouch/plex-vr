import React from 'react'
import { connect } from 'react-redux'

import { fetchMediaItems } from '~actions/media-items'

class Browser extends React.Component {
  constructor(props) {
    super(props)

    this.handleFetchContent = this.handleFetchContent.bind(this)

    this.handleFetchContent()
  }

  handleFetchContent() {
    const {
      resources,
      sections,
      onFetchContent,
      match: { params: { section, server } }
    } = this.props

    const serverUri = resources
      .find(({ name }) => name === server)
      .connections.find(({ local }) => local === '0').uri
    const path = sections.find(({ title }) => title === section).path

    onFetchContent({ serverUri, path })
  }

  render() {
    const { mediaItems } = this.props

    if (!mediaItems) {
      return <div>Loading...</div>
    }

    return (
      <div>
        {mediaItems.map(({ title, key }) => <div key={key}>{title}</div>)}
      </div>
    )
  }
}

export default connect(
  ({
    resourcesStore: { resources },
    sectionsStore: { sections },
    browser: { mediaItems }
  }) => ({
    resources,
    sections,
    mediaItems
  }),
  dispatch => ({
    onFetchContent: ({ serverUri, path }) =>
      dispatch(fetchMediaItems({ serverUri, path }))
  })
)(Browser)
