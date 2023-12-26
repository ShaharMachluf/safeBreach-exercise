
const { Telegraf } = require('telegraf');
const { message } = require("telegraf/filters");
const translate = require('./translator.js');
const getJoke = require('./jokes.js');

const BOT_TOKEN = '6583182223:AAEggHMQp8Xnp3xZE7CHGxLHRkh9dV-69NI'

const bot = new Telegraf(BOT_TOKEN);

let language = 'english';

bot.start(ctx => {
  return ctx.reply(`Welcome to the Chuck Norris jokes translator bot!\n
  Make it work by first setting the language that you want the joke to be translated to ('set language to <language>')\n
  Then choose the number of the joke (1-101)`);
});

bot.launch();

bot.on(message("text"), async ctx => {
    const t = ctx.message.text;
    if(t.includes("Set language")){
        try {
            language = t.split(' ')[2];
            const reply = await translate(language, 'no problem');
            // console.log("reply: " + reply);
            ctx.reply(reply);
        } catch (error) {
            console.error('Error in bot.on text event:', error);
            // Handle errors if necessary
            ctx.reply('An error occurred during translation.');
        }
    } else if(!isNaN(t) && parseInt(t) > 0 && parseInt(t) < 102){
        const joke = await getJoke(parseInt(t) - 1)
        console.log(joke);
        const reply = await translate(language, joke);
        ctx.reply(reply);

    } else{
        ctx.reply("Not a valid request.\n you can either set a language ('set language to <language>') or choose a number of joke (1-101)")
    }
    
});

