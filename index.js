const Discord = require("discord.js");
const bot = new Discord.Client({
    intents: 3276799,
});

token = require("./Config/Token_Config");
const loadCommands = require("./Handlers/loadCommands");
const loadEvents = require("./Handlers/loadEvents");

bot.commands = new Discord.Collection();

bot.login(token);
loadCommands(bot);
loadEvents(bot);
