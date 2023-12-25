const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');

let key = "68798218d7b840a0abc88fff0bf6651c";
let endpoint = "https://api.cognitive.microsofttranslator.com";

// location, also known as region.
// required if you're using a multi-service or regional (not global) resource. It can be found in the Azure portal on the Keys and Endpoint page.
let location = "germanywestcentral";

axios({
    baseURL: endpoint,
    url: '/translate',
    method: 'post',
    headers: {
        'Ocp-Apim-Subscription-Key': key,
         // location required if you're using a multi-service or regional (not global) resource.
        'Ocp-Apim-Subscription-Region': location,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString()
    },
    params: {
        'api-version': '3.0',
        'from': 'en',
        'to': 'he'
    },
    data: [{
        'text': 'I would really like to drive your car around the block a few times!'
    }],
    responseType: 'json'
}).then(function(response){
    console.log(JSON.stringify(response.data, null, 4));
})

axios.get(`${endpoint}/Languages?api-version=3.0&scope=translation`)
.then(function(response){
    console.log(JSON.stringify(response.data, null, 4));
}).catch((err) => {console.log(err.message);})