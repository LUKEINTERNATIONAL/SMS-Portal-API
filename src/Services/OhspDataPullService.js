const  https = require ('https')

function pullData() {
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
            var str = "";
            response.on('data', (d) => {
                str+=d;
            }).on('end',()=>{
                //console.log(JSON.parse(str))
                return JSON.parse(str)
            });
        }
    )

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`)
        return 0
      });
     
    req.end();
}

module.exports = { pullData }