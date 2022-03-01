var https = require('https');

var url = 'https://covmw.com/ohspdev/api/dataValueSets.json?dataSet=waoQ016uOz1&period=2022W6&orgUnit=XcRAuC6ZPi0';

function makeCall (url, callback) {
    https.get(url,function (res) {
        res.on('data', function (d) {
            callback(JSON.parse(d));
        });
        res.on('error', function (e) {
            console.error(e);
        });
    });
}

function handleResults(results){
    console.log(results)
}

makeCall(url, function(results){
    handleResults(results);        
});