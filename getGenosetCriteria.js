const request = require('request')
const cheerio = require('cheerio')

const config = require('./config')

module.exports = (partialUrl) => {
  const url = `${config.baseUrl}${partialUrl}/criteria`
  const genosetId = partialUrl.split('/')[2]

  return new Promise((resolve, reject) => {
    request(url, function (error, response, html) {
      if (error) {
        reject(`${genosetId} - ${url}:: ${error}`)
        return
      }

      var $ = cheerio.load(html)
      var json = {genoset: genosetId, criteria: ''}
      json.criteria = $('#mw-content-text').text()

      // remove all comments
      json.criteria = json.criteria.split('\n').map((line) => line.split('#')[0]).join('')

      // remove all whitespace
      json.criteria = json.criteria.replace(/\s+/g, '')

      // reject any page that has no text
      if (json.criteria.includes('Thereiscurrentlynotextinthispage')) {
        reject('No text on page')
      }

      resolve(json)
    })
  })
}
