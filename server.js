const getGenosetList = require('./getGenosetList')
const getGenosetCriteria = require('./getGenosetCriteria')

getGenosetList()
  .then((list) => {
    list.forEach((genosetUrl) => {
      getGenosetCriteria(genosetUrl)
        .then((criteria) => console.log(criteria))
        .catch((err) => console.log(`Error getting criteria: ${err}`))
    })
  })
  .catch((err) => console.log(`Error getting genoset list: ${err}`))
