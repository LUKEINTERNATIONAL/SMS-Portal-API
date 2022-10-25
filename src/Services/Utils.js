function checkTimeIf1600() {
    var now = new Date
    var time = now.getUTCHours()

    var d = new Date;
    d.setHours(16)
    d = d.getUTCHours()
    
    if(time == d) {
        return true
    } else {
        return false
    }
}

module.exports = { checkTimeIf1600 }