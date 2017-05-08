import xml2json from '~util/xml2json'

export const requestJSON = async (url, options) => {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      const { status, statusText } = response
      const { error } = await response.json()

      return Promise.reject({
        status,
        statusText,
        error
      })
    }

    const contentType = response.headers.get('Content-Type')
    if (contentType.includes('application/json')) {
      return response.json()
    }

    if (contentType.includes('application/xml')) {
      const xml = await response.text()
      return xml2json(xml)
    }

    return Promise.reject('Response contains unknown content type')
  } catch (error) {
    throw error.message
  }
}
