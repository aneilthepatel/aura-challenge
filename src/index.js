
let data = require('./data.json')
const { findClosest, findClosestIndex } = require('find-closest');

/*
 Auther : Anil Patel
 Email : anil@webkorps.com
*/
module.exports.handler = async event => {

  console.log("Event : " + JSON.stringify(event));

  let result = []

  try {
    for (let i = 0 ; i < Object.keys(event.queryStringParameters).length ; i++) {
        //console.log('Search Pattern :',(Object.keys(event.queryStringParameters)[i]));
        switch (Object.keys(event.queryStringParameters)[0]) {

          case 'zip':
            result = data.filter(d => d.zip.match(event.queryStringParameters.zip))
            break;

          case 'primary_city':
            result = data.filter(d => d.primary_city.match(event.queryStringParameters.primary_city))
            break;

          case 'type':
            result = data.filter(d => d.type.match(event.queryStringParameters.type))
            break;

          case 'state':
            result = data.filter(d => d.state.match(event.queryStringParameters.state))
            break;

          case 'county':
            result = data.filter(d => d.county.match(event.queryStringParameters.county))
            break;

          case 'timezone':
            result = data.filter(d => d.timezone.match(event.queryStringParameters.timezone))
            break;

          case 'country':
            result = data.filter(d => d.country.match(event.queryStringParameters.country))
            break;

          case 'latitude':
            let findLatitude = event.queryStringParameters.latitude;
            result = findClosest(data, findLatitude, ({ latitude }) => latitude);
            break;

          case 'longitude':
            let findLongitude = event.queryStringParameters.longitude;
            result = findClosest(data, findLongitude, ({ longitude }) => longitude);
            break;

          default:
            result = "NO Match Found !"
            break;

        }
    }
    return result

  } catch (error) {
    return error
  }
};

// Test Event :
// console.log(handler({
//   "httpMethod": "GET",
//   "path": "/resource",
//   "headers": {},
//   "queryStringParameters": {
//     "zip": "01002"
//   }
// }))