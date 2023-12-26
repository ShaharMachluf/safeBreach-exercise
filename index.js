
const { Telegraf } = require('telegraf');
const { message } = require("telegraf/filters");
const translate = require('./translator.js')

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
    try {
        language = ctx.message.text.split(' ')[2];
        const reply = await translate(language, 'no problem');
        // console.log(reply);
        ctx.reply(reply);
    } catch (error) {
        console.error('Error in bot.on text event:', error);
        // Handle errors if necessary
        ctx.reply('An error occurred during translation.');
    }
});