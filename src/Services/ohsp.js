const { response } = require('express');
const  request = require ('https');

let data = {"user": ""}
data = JSON.stringify(data)
send(data)
console.log("DATA: ", data)

function send(data) {
    var user = "eidsr";
    var password = "Eidsr2021!";
    var auth = "Basic " + new Buffer(user + ":" + password).toString("base64");

    console.log("auth: ", auth)

    const req = request.request(
      {
        host: 'covmw.com',
        path: '/ohspdev/api/dataValueSets',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : auth,
          'Accept' : '*/*'
        }
      },
      response => {
          //console.log(response)
          var str = "";
          console.log("######", response.body)
        console.log(response.statusCode); // 200
        response.on('data', (d) => {
          str+=d;
       }).on('end',()=>{
          console.log(str);
       });
      }
    );
     
    req.write(data)

    console.log("DATA", req.data)
     
    req.end();
  }