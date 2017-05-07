import { parseString } from 'xml2js'

export default xml =>
  new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })
