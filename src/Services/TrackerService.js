var lineReader = require('reverse-line-reader')
const {Facility} = require('../models')


async function updateLastPing(ip_address) {

    lineReader.eachLine('../access.log', function(line, last, cb) {
        ipExists = line.search(ip_address)
    
        if (last) {
            // stop reading
            cb(false) 
        } else {
            if(ipExists != -1) {
                //last = false
                //cb(false) // stop reading
                //getting latest pinged date
                const extractedDate = line.substring(
                    line.indexOf("[") + 1, 
                    line.lastIndexOf("]")
                )
                //
                console.log(extractedDate)
                 // stop reading
                cb(false)
            } else {
                 // stop reading
                cb()
            }
        }
    })
}

async function getFacilities() {
    try {
        const facilities = await Facility.findAll()

        facilities.forEach(facility => {
            if (facility.dataValues.vpn_ip_address != null) {
                updateLastPing(facility.dataValues.vpn_ip_address)
            }
        });

    } catch (error) {
        console.log("error: "+error)
    }
}

getFacilities()