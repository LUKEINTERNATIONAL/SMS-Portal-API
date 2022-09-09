const fs = require('fs')
const {Facility} = require('../models')

/* reading Health access.log */
fs.readFile('../access.log', 'utf8', function(err, data) {
    if (err) throw err;
    //console.log(data);
});

async function getFacility(ip_address) {
    try {
        const facility = await Facility.findOne({
            where: {
              vpn_ip_address: ip_address
            }
        })

        console.log(facility)
    } catch (error) {
        console.log("error: "+error)
    }
}

getFacility('127.0.0.1')