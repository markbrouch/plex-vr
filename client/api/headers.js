import UAParser from 'ua-parser-js'
import uuid from 'uuid/v4'

const UA = UAParser(navigator.userAgent)

export const PLEX_HEADERS = {
  PLATFORM: {
    name: 'X-Plex-Platform',
    default: UA.os.name
  },
  PLATFORM_VERSION: {
    name: 'X-Plex-Platform-Version',
    default: UA.os.version
  },
  PROVIDES: {
    name: 'X-Plex-Provides',
    default: 'client,player,controller'
  },
  CLIENT_IDENTIFIER: {
    name: 'X-Plex-Client-Identifier',
    default: uuid()
  },
  PRODUCT: {
    name: 'X-Plex-Product',
    default: 'Plex VR'
  },
  VERSION: {
    name: 'X-Plex-Version',
    default: process.env.VERSION
  },
  DEVICE_TYPE: {
    name: 'X-Plex-Device',
    default: UA.device.type
  },
  DEVICE_MODEL: {
    name: 'X-Plex-Model',
    default: UA.device.model
  },
  DEVICE_VENDOR: {
    name: 'X-Plex-Vendor',
    default: UA.device.vendor
  },
  DEVICE_NAME: {
    name: 'X-Plex-Device-Name',
    default: `Plex VR (${UA.browser.name ? UA.browser.name : 'unknown'})`
  },
  TOKEN: {
    name: 'X-Plex-Token',
    default: ''
  }
}

export const getPlexHeaders = ({ uuid, authToken }) => {
  const plexHeaders = new Headers({
    [PLEX_HEADERS.PROVIDES.name]: PLEX_HEADERS.PROVIDES.default,
    [PLEX_HEADERS.PRODUCT.name]: PLEX_HEADERS.PRODUCT.default,
    [PLEX_HEADERS.VERSION.name]: PLEX_HEADERS.VERSION.default,
    [PLEX_HEADERS.DEVICE_NAME.name]: PLEX_HEADERS.DEVICE_NAME.default
  })
  if (PLEX_HEADERS.PLATFORM.default)
    plexHeaders.set(PLEX_HEADERS.PLATFORM.name, PLEX_HEADERS.PLATFORM.default)
  if (PLEX_HEADERS.PLATFORM_VERSION.default)
    plexHeaders.set(
      PLEX_HEADERS.PLATFORM_VERSION.name,
      PLEX_HEADERS.PLATFORM_VERSION.default
    )
  if (PLEX_HEADERS.DEVICE_TYPE.default)
    plexHeaders.set(
      PLEX_HEADERS.DEVICE_TYPE.name,
      PLEX_HEADERS.DEVICE_TYPE.default
    )
  if (PLEX_HEADERS.DEVICE_MODEL.default)
    plexHeaders.set(
      PLEX_HEADERS.DEVICE_MODEL.name,
      PLEX_HEADERS.DEVICE_MODEL.default
    )
  if (PLEX_HEADERS.DEVICE_VENDOR.default)
    plexHeaders.set(
      PLEX_HEADERS.DEVICE_VENDOR.name,
      PLEX_HEADERS.DEVICE_VENDOR.default
    )

  if (uuid) plexHeaders.set(PLEX_HEADERS.CLIENT_IDENTIFIER.name, uuid)
  if (authToken) plexHeaders.set(PLEX_HEADERS.TOKEN.name, authToken)

  return plexHeaders
}

export default getPlexHeaders
