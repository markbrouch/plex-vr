import React from 'react'
import { connect } from 'react-redux'

import { fetchSections } from '~actions/sections'
import {fetchResources} from '~actions/resources'

const SectionCard = ({ title, serverName }) => (
  <div className="card">
    <div className="card-block">
      <h4 className="card-title">{title}</h4>
      <dl className="card-text row">
        <dt className="col-sm-3">Server</dt>
        <dd className="col-sm-9">{serverName}</dd>
      </dl>
    </div>
  </div>
)

class Library extends React.Component {
  constructor(props) {
    super(props)

    this.handleFetchSections = this.handleFetchSections.bind(this)
    this.handleFetchResources = this.handleFetchResources.bind(this)

    this.handleFetchSections()
    this.handleFetchResources()
  }

  handleFetchSections() {
    this.props.onFetchSections()
  }

  handleFetchResources() {
    this.props.onFetchResources()
  }

  render() {
    const { sections, error } = this.props
    const DISPLAY_TYPES = ['movie', 'show']

    if (error) {
      return (
        <div className="alert alert-danger">
          Error - could not load Sections.
          <button
            type="button"
            className="btn btn-link"
            onClick={this.handleFetchSections}
          >
            Try again
          </button>
        </div>
      )
    }

    if (!sections) {
      return <div>Loading...</div>
    }
    return (
      <div>
        {sections
          .filter(({ type }) => DISPLAY_TYPES.includes(type))
          .map(({ uuid, title, serverName }) => (
            <SectionCard key={uuid} title={title} serverName={serverName} />
          ))}
      </div>
    )
  }
}

export default connect(
  ({ sectionsStore: { sections, error } }) => ({
    sections,
    error
  }),
  dispatch => ({
    onFetchSections: () => dispatch(fetchSections()),
    onFetchResources: () => dispatch(fetchResources())
  })
)(Library)
