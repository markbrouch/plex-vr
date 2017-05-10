import { createAction } from 'redux-actions'

import API from '~api'

const getServerUri = (resources, id) =>
  resources
    .find(resource => resource.clientIdentifier === id)
    .connections.find(connection => connection.local === '0').uri

export const SECTIONS = 'SECTIONS'

export const fetchSections = () => (dispatch, getState) => {
  const {
    uuid,
    userStore: { user: { authToken } },
    library: { server: serverId },
    resourcesStore: { resources }
  } = getState()
  const serverUri = getServerUri(resources, serverId)

  return dispatch(
    createAction(SECTIONS, API.fetchSections)({ authToken, uuid, serverUri })
  )
}

export const SECTION = 'SECTION'

export const fetchSection = ({ sectionId }) => (dispatch, getState) => {
  const {
    uuid,
    userStore: { user: { authToken } },
    library: { server: serverId },
    resourcesStore: { resources }
  } = getState()
  const serverUri = getServerUri(resources, serverId)

  return dispatch(
    createAction(SECTION, API.fetchSection)({
      authToken,
      uuid,
      serverUri,
      sectionId
    })
  )
}
