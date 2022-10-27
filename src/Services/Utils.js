function checkTimeIf1700() {
    var now = new Date
    var time = now.getUTCHours()

    var d = new Date;
    d.setHours(17)
    d = d.getUTCHours()
    
    if(time == d) {
        return true
    } else {
        return false
    }
}

module.exports = { checkTimeIf1700 }