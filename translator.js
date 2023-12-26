const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');

let key = "68798218d7b840a0abc88fff0bf6651c";
let endpoint = "https://api.cognitive.microsofttranslator.com";
let location = "germanywestcentral";


module.exports = async function translate(language, text) {
    try {
        const languageCode = await getLanguageCode(language);

        const response = await axios({
            baseURL: endpoint,
            url: '/translate',
            method: 'post',
            headers: {
                'Ocp-Apim-Subscription-Key': key,
                'Ocp-Apim-Subscription-Region': location,
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString()
            },
            params: {
                'api-version': '3.0',
                'from': 'en',
                'to': languageCode
            },
            data: [{
                'text': text
            }],
            responseType: 'json'
        });

        return response.data[0].translations[0].text;
    } catch (error) {
        console.error('Error in translate function:', error);
        throw error; 
    }
}

async function getLanguageCode(language) {
    try {
        const response = await axios.get(`${endpoint}/Languages?api-version=3.0&scope=translation`);
        const languages = response.data.translation;
        const code = await Object.keys(languages).find(key => languages[key].name == language);
        return code;
    } catch (err) {
        console.error(err.message);
        throw err; 
    }
}
