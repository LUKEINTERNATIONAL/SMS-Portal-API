const {NodeSSH} = require('node-ssh')
const ssh = new NodeSSH()
const {Facility} = require('../models')
const Promise = require('bluebird')

async function findFacilitities() {
  try {
    const FACILITIES = await Facility.findAll()
  
    for(const FACILITY of FACILITIES) {
      const host = FACILITY.dataValues.vpn_ip_address
      const username = FACILITY.dataValues.server_username
      const password = FACILITY.dataValues.server_password

      await callRemoteProcedure(host, username, password)
    }
  
  } catch (error) {
    console.error(error)
  }
}

async function callRemoteProcedure(host, username, password) {
  try {

    const ip = host
    const usrnm = username
    const psswrd = password

    await Promise.all(
      ssh.connect({
        host: ip,
        username: usrnm,
        password: psswrd
      }).
      then(() => {
        ssh.execCommand("/bin/bash --login -c \"rails runner notifiable_disease_conditions_report.rb\"", { cwd:'/var/www/BHT-EMR-API/bin/idsr' }).then(function(result) {
            console.log('STDOUT: ' + result.stdout)
            console.log('STDERR: ' + result.stderr)
          })
      })
    )
    
  } catch (error) {
    console.error(error)
  }
}

ssh.connect({
  host: '10.43.27.3',
  username: 'meduser',
  password: 'letmein'
}).
then(() => {
  ssh.execCommand("/bin/bash --login -c \"rails runner notifiable_disease_conditions_report.rb\"", { cwd:'/var/www/BHT-EMR-API/bin/idsr' }).then(function(result) {
      console.log('STDOUT: ' + result.stdout)
      console.log('STDERR: ' + result.stderr)
    })
})

module.exports = { findFacilitities }
