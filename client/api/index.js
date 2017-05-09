import qs from 'qs'
import UAParser from 'ua-parser-js'
import uuid from 'uuid/v4'

import { requestJSON } from '~api/request'
import getPlexHeaders, { PLEX_HEADERS } from '~api/headers'

export default {
  async createLogin({ username, password, uuid }) {
    const formData = qs.stringify({
      'user[login]': username,
      'user[password]': password
    })

    const headers = getPlexHeaders({ uuid })
    headers.set(
      'Content-Type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    )

    return await requestJSON('https://plex.tv/users/sign_in.json', {
      method: 'POST',
      headers,
      body: formData
    })
  },

  async fetchResources({ uuid, authToken }) {
    const headers = getPlexHeaders({ uuid, authToken })

    const json = await requestJSON(
      'https://plex.tv/api/resources?includeHttps=1',
      { headers }
    )

    return {
      resources: json.MediaContainer.Device.map(device => ({
        ...device.$,
        connections: device.Connection.map(connection => connection.$)
      }))
    }
  },

  async fetchSections({ uuid, authToken, serverUri }) {
    const headers = getPlexHeaders({ uuid, authToken })

    const json = await requestJSON(`${serverUri}/library/sections`, { headers })

    return {
      sections: json.MediaContainer.Directory.map(directory => directory.$)
    }
  },

  async fetchSection({ uuid, authToken, serverUri, sectionId }) {
    const headers = getPlexHeaders({
      uuid,
      authToken,
      containerStart: 0,
      containerSize: 50
    })

    const json = await requestJSON(
      `${serverUri}/library/sections/${sectionId}/all`,
      { headers }
    )

    return {
      section: json.MediaContainer.Video.map(video => video.$)
    }
  }
}
