import qs from 'qs'
import UAParser from 'ua-parser-js'
import uuid from 'uuid/v4'

import xml2json from '~util/xml2json'

const UA = UAParser(navigator.userAgent)
console.log(UA)

const PLEX_PLATFORM = {
  name: 'X-Plex-Platform',
  default: UA.os.name
}
const PLEX_PLATFORM_VERSION = {
  name: 'X-Plex-Platform-Version',
  default: UA.os.version
}
const PLEX_PROVIDES = {
  name: 'X-Plex-Provides',
  default: 'client,player,controller'
}
const PLEX_CLIENT_IDENTIFIER = {
  name: 'X-Plex-Client-Identifier',
  default: uuid()
}
const PLEX_PRODUCT = {
  name: 'X-Plex-Product',
  default: 'Plex VR'
}
const PLEX_VERSION = {
  name: 'X-Plex-Version',
  default: process.env.VERSION
}
const PLEX_DEVICE_TYPE = {
  name: 'X-Plex-Device',
  default: UA.device.type
}
const PLEX_DEVICE_MODEL = {
  name: 'X-Plex-Model',
  default: UA.device.model
}
const PLEX_DEVICE_VENDOR = {
  name: 'X-Plex-Vendor',
  default: UA.device.vendor
}
const PLEX_DEVICE_NAME = {
  name: 'X-Plex-Device-Name',
  default: `Plex VR (${UA.browser.name})`
}
const PLEX_TOKEN = {
  name: 'X-Plex-Token',
  default: ''
}

export default {
  async createLogin({ username, password, uuid }) {
    try {
      const formData = qs.stringify({
        'user[login]': username,
        'user[password]': password
      })

      const headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        [PLEX_PLATFORM.name]: PLEX_PLATFORM.default,
        [PLEX_PLATFORM_VERSION.name]: PLEX_PLATFORM_VERSION.default,
        [PLEX_PROVIDES.name]: PLEX_PROVIDES.default,
        [PLEX_CLIENT_IDENTIFIER.name]: uuid || PLEX_CLIENT_IDENTIFIER.default,
        [PLEX_PRODUCT.name]: PLEX_PRODUCT.default,
        [PLEX_VERSION.name]: PLEX_VERSION.default,
        [PLEX_DEVICE_TYPE.name]: PLEX_DEVICE_TYPE.default,
        [PLEX_DEVICE_MODEL.name]: PLEX_DEVICE_MODEL.default,
        [PLEX_DEVICE_VENDOR.name]: PLEX_DEVICE_VENDOR.default,
        [PLEX_DEVICE_NAME.name]: PLEX_DEVICE_NAME.default
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

  async fetchSections({ authToken, uuid }) {
    const headers = new Headers({
      [PLEX_PLATFORM.name]: PLEX_PLATFORM.default,
      [PLEX_PLATFORM_VERSION.name]: PLEX_PLATFORM_VERSION.default,
      [PLEX_PROVIDES.name]: PLEX_PROVIDES.default,
      [PLEX_CLIENT_IDENTIFIER.name]: uuid || PLEX_CLIENT_IDENTIFIER.default,
      [PLEX_PRODUCT.name]: PLEX_PRODUCT.default,
      [PLEX_VERSION.name]: PLEX_VERSION.default,
      [PLEX_DEVICE_TYPE.name]: PLEX_DEVICE_TYPE.default,
      [PLEX_DEVICE_MODEL.name]: PLEX_DEVICE_MODEL.default,
      [PLEX_DEVICE_VENDOR.name]: PLEX_DEVICE_VENDOR.default,
      [PLEX_DEVICE_NAME.name]: PLEX_DEVICE_NAME.default,
      [PLEX_TOKEN.name]: authToken || PLEX_TOKEN.default
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
