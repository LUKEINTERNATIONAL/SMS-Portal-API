const fs = require('fs')

/* reading Health access.log */
fs.readFile('../access.log', 'utf8', function(err, data) {
    if (err) throw err;
    console.log(data);
});