const request = require('request')
const cheerio = require('cheerio')

const config = require('./config')

module.exports = () => {
  return new Promise((resolve, reject) => {
    request(config.genosetListUrl, (err, res, html) => {
      if (err) {
        reject(err)
        return
      }

      const $ = cheerio.load(html)
      const list = $('.wikitable tbody').children().toArray().map((row) => row.children[0].children[0].attribs.href)

      resolve(list)
    })
  })
}
