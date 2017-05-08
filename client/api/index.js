import qs from 'qs'
import UAParser from 'ua-parser-js'
import uuid from 'uuid/v4'

import { requestJSON } from '~api/request'
import getPlexHeaders from '~api/headers'

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

  async fetchSections({ uuid, authToken }) {
    const headers = getPlexHeaders({ uuid, authToken })

    const json = await requestJSON(
      'https://plex.tv/pms/system/library/sections',
      { headers }
    )

    return {
      sections: json.MediaContainer.Directory.map(directory => directory.$)
    }
  }
}
