const csv = require('csv-parser')
const fs = require('fs')
const results = []
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
            var data = "";
            response.on('data', (d) => {
                data+=d;
            }).on('end',()=>{
              
              data = JSON.parse(data)
              console.log(data.orgUnit)
              for (let facility of csv_Obj) {
              let OrgUnitID = facility.OrgUnitID
              let OrgUnitName = facility.OrgUnitName
              if (OrgUnitID == data.orgUnit) {
                console.log(OrgUnitName)
              }
                // for (let set in data) {
                //   //console.log(typeof(set))
                //   //console.log("orgUnit: ", set.dataSet)
                // }
              }
            });
        }
    )
     
    req.end()
  }
