const csv = require('csv-parser')
const fs = require('fs')
const results = []
const Weekly = []
const  https = require ('https')

/* reading Health Facilities.csv */
fs.createReadStream('../IDSRMetadata/Health Facilities.csv')
  .pipe(csv({}))
  .on('data', (data) => {
    results.push(data)
  })
  .on('end', () => {
      //console.log(results)
      map(results)
  })

async function map(csv_Obj) {
  var user = "eidsr"
  var password = "Eidsr2021!"
  var auth = "Basic " + new Buffer(user + ":" + password).toString("base64")

  const req = https.request(
    {
      host: 'covmw.com',
      path: '/ohspdev/api/dataValueSets.json?dataSet=waoQ016uOz1&period=2022W6&orgUnit=XcRAuC6ZPi0',
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : auth,
          'Accept' : '*/*'
      }
    },
    response => {
      var data = ""
      response.on('data', (d) => {
          data+=d;
      }).on('end', () => {
        data = JSON.parse(data)
        console.log(data.orgUnit)

        for (let facility of csv_Obj) {
          let OrgUnitID = facility.OrgUnitID
          let OrgUnitName = facility.OrgUnitName

          if (OrgUnitID == data.orgUnit) {
            console.log(OrgUnitName)
            mapCase('Weekly', data.dataValues)
            break;
          }
        }
      })

    }
  )

  req.end();
}

function mapCase(type, dataValues) {
  let file = 'IDSR '+ type +' Reporting Integration IDs.csv'
  fs.createReadStream('../IDSRMetadata/'+file)
  .pipe(csv({}))
  .on('data', (data) => {
    Weekly.push(data)
  })
  .on('end', () => {
    let filteredObj = dataValues.filter( (el) => {
      return el.value > 0
    })

    for (let condition of filteredObj) {
      let dataElement = condition.dataElement
      let categoryOptionCombo = condition.categoryOptionCombo
      let attributeOptionCombo = condition.attributeOptionCombo
      let value = condition.value

      for (let case_ of Weekly) {
        let DataSetID = case_.DataSetID
        let DataElementName = case_.DataElementName
        let DataElementUID = case_.DataElementUID
        let OptionLessFive = case_.OptionLessFive
        let OptionGreaterEqualFive = case_.OptionGreaterEqualFive

        if (DataElementUID == dataElement) {
          console.log(DataElementName)

          if (OptionLessFive == categoryOptionCombo) {
            console.log("Less than five years <")
            console.log(condition.value)
          }
          if (OptionGreaterEqualFive == categoryOptionCombo) {
            console.log("Greater than five years >")
            console.log(condition.value)
          }
        } 
          



      }
    }
  })
}
