import qs from 'qs'
import xml2json from '~util/xml2json'

const PLEX_CLIENT_ID = '12345'

export default {
  async createLogin({ username, password }) {
    try {
      const formData = qs.stringify({
        'user[login]': username,
        'user[password]': password
      })

      const headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Plex-Client-Identifier': PLEX_CLIENT_ID
      })

      const response = await fetch('https://plex.tv/users/sign_in.json', {
        method: 'POST',
        headers,
        body: formData
      })

      if (!response.ok) {
        const { status, statusText } = response
        const { error } = await response.json()

        return Promise.reject({
          status,
          statusText,
          error
        })
      }

      return response.json()
    } catch (error) {
      throw error.message
    }
  },

  async fetchSections({ authToken }) {
    const headers = new Headers({
      'X-Plex-Client-Identifier': PLEX_CLIENT_ID,
      'X-Plex-Token': authToken
    })

    const response = await fetch(
      'https://plex.tv/pms/system/library/sections',
      { headers }
    )

    const xml = await response.text()
    const json = await xml2json(xml)

    return {
      sections: json.MediaContainer.Directory.map(directory => directory.$)
    }
  }
}
