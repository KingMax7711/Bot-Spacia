const Discord = require("discord.js");

module.exports = {
    name: "ping",
    description: "Affiche le PING du bot",
    permission: "Aucune",
    dm: true,
    category: "Maintenance",

    async run(bot, message, args) {
        await message.reply(`Ping: \`${bot.ws.ping}\``);
    },
};
