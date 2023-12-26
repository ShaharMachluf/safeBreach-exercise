const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://parade.com/968666/parade/chuck-norris-jokes/';
const apikey = 'cdbd76fb06ca1cd066a0ea48d6350b3b1852af6b';

//get the chosen joke from the Chuck Norris's jokes webpage
module.exports = async function getJoke(index){
    try{
        const response = await axios({
            url: 'https://api.zenrows.com/v1/',
            method: 'GET',
            params: {
                'url': url,
                'apikey': apikey,
            },
        })
        const $ = cheerio.load(response.data);
        console.log($('ol').find(`ol > li:eq(${index})`).text());
        return ($('ol').find(`ol > li:eq(${index})`).text());
    }
            
    catch(error){
        console.log(error)
    }
}
