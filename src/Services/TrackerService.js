var lineReader = require('reverse-line-reader')
const {Facility} = require('../models')


await function updateLastPing(ip_address) {

    lineReader.eachLine('../access.log', function(line, last, cb) {
        ipExists = line.search(ip_address)
    
        if(ipExists != -1) {
            cb(false); // stop reading
            

        }
        if (last) {
          cb(false); // stop reading
        } else {
          cb();
        }
    })
}

async function getFacilities() {
    try {
        const facilities = await Facility.findAll()

        facilities.forEach(facility => {
            if (facility.dataValues.vpn_ip_address != null) {
                
            }
        });

    } catch (error) {
        console.log("error: "+error)
    }
}

getFacilities()