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

function groupBy(collection, property) {
    var i = 0, val, index,
        values = [], result = [];
    for (; i < collection.length; i++) {
        val = collection[i][property];
        index = values.indexOf(val);
        if (index > -1)
            result[index].push(collection[i]);
        else {
            values.push(val);
            result.push([collection[i]]);
        }
    }
    return result;
}

module.exports = { checkTimeIf1700, groupBy }