import React from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'

import { fetchSections } from '~actions/sections'
import { fetchResources } from '~actions/resources'

import Browser from '~components/browser'

const SectionCard = ({ title, serverName }) => (
  <div className="card">
    <div className="card-block">
      <h4 className="card-title">{title}</h4>
      <div className="card-text">
        <h5>{serverName}</h5>
        <Link
          to={`/library/${serverName}/${title}`}
          className="btn btn-primary"
          role="button"
        >
          Browse
        </Link>
      </div>
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
      <div className="row">
        <div className="col-md-3">
          {sections
            .filter(({ type }) => DISPLAY_TYPES.includes(type))
            .map(({ uuid, title, serverName }) => (
              <SectionCard key={uuid} title={title} serverName={serverName} />
            ))}
        </div>
        <div className="col-md-9">
          <Route path="/library/:server/:section" component={Browser} />
        </div>
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
