
const { Telegraf } = require('telegraf');
const { message } = require("telegraf/filters");
const translate = require('./translator.js');
const getJoke = require('./jokes.js');

const BOT_TOKEN = '6583182223:AAEggHMQp8Xnp3xZE7CHGxLHRkh9dV-69NI'

const bot = new Telegraf(BOT_TOKEN);

let language = 'english';

//set up
bot.start(ctx => {
  return ctx.reply(`Welcome to the Chuck Norris jokes translator bot!\n
  Make it work by first setting the language that you want the joke to be translated to ('Set language to <language>')\n
  Then choose the number of the joke (1-101)`);
});

bot.launch();

//handle messages
bot.on(message("text"), async ctx => {
    const t = ctx.message.text;
    //set language
    if(t.includes("Set language") || t.includes("set language") || t.includes("SET LANGUAGE")){
        try {
            language = t.split(' ')[2];
            const reply = await translate(language, 'no problem');
            ctx.reply(reply);
        } catch (error) {
            console.error('Error in bot.on text event:', error);
            ctx.reply('An error occurred during translation.');
        }
    //choose joke
    } else if(!isNaN(t) && parseInt(t) > 0 && parseInt(t) < 102){
        const joke = await getJoke(parseInt(t) - 1)
        console.log(joke);
        const reply = await translate(language, joke);
        ctx.reply(reply);
    //invalid
    } else{
        ctx.reply("Invalid request.\n you can either set a language ('set language to <language>') or choose a number of joke (1-101)")
    }
    
});

