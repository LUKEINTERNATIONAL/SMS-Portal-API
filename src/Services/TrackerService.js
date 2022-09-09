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
                //getting latest pinged date
                const extractedDate = line.substring(
                    line.indexOf("[") + 1, 
                    line.lastIndexOf("+")
                ).trim()
                // update lastpinged date value
                const newDate = new Date(Date.parse(extractedDate.replace(':', " ")+' GMT')).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ")
                updateFacilty(ip_address, newDate)
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

async function updateFacilty(ip_address, date) {
    await Facility.update({ last_pinged: date }, {
        where: {
            vpn_ip_address: ip_address
        }
    })
}

async function initSrvc() {
    await getFacilities()
}

module.exports = {initSrvc}